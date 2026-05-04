# Admin-only upload system for Mr. Please

## Context

Today the site has Supabase auth wired up (`login-form.tsx`, `sign-up-form.tsx`, `/auth/*`, middleware in `lib/supabase/middleware.ts`) but no way to create content. The Jamboree Supabase project (`aunbnqdouehhwwshtelb`) has 9 tables (`artist`, `venue`, `show`, `set`, `song`, `song_set`, `note`, `user`, `user_show`) with **RLS disabled on every table** and zero rows. There's no role system, no admin UI, no link between `public.user` and `auth.users`.

Goal:
- **Admin (you, `alex.b.hamilton56@gmail.com` / `904a7e0e-979f-412c-9f5f-8b6bdc95852b`)** can create shows + setlists (plus artists/venues/songs inline when they don't exist), and upload artwork/photos.
- **Fans** can sign up, browse all content, save shows they've attended (`user_show`), and see profile stats (total shows, songs heard + rarities, venues/cities, timeline).
- Admin is identified by `auth.users.raw_app_meta_data.role = 'admin'` — JWT claim read by RLS and Next.js middleware. Not spoofable from the client.

## 1. Database layer (via `mcp__supabase__apply_migration`)

All DDL goes through the Supabase MCP so it's tracked as migrations (the `list_migrations` output is currently empty).

### 1.1 Link `public.user` to `auth.users`
- Change `public.user.id` to be a FK/PK referencing `auth.users(id)` (`ON DELETE CASCADE`). Drop `DEFAULT gen_random_uuid()`.
- Add a trigger `handle_new_user()` on `auth.users` AFTER INSERT that inserts a matching `public.user` row (pulls `email` → `email_address`, `raw_user_meta_data.display_name` → `display_name`, falls back to email local-part).
- Backfill: insert a `public.user` row for your existing `auth.users` row.

### 1.2 Admin role
- `UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb WHERE id = '904a7e0e-979f-412c-9f5f-8b6bdc95852b';`
- Helper: `CREATE FUNCTION public.is_admin() RETURNS boolean LANGUAGE sql STABLE AS $$ SELECT coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false) $$;`

### 1.3 Schema additions for media
Artwork/photos go in Supabase Storage; DB stores paths.
- `ALTER TABLE public.artist ADD COLUMN image_path text;`
- `ALTER TABLE public.show  ADD COLUMN image_path text;`
- New table `public.show_photo(id uuid PK, show_id uuid FK→show ON DELETE CASCADE, path text NOT NULL, caption text, created_at timestamptz DEFAULT now())` — for multi-photo galleries per show.
- Storage bucket `media` (public read). Path convention: `artists/{artist_id}/...`, `shows/{show_id}/cover.*`, `shows/{show_id}/photos/{photo_id}.*`.

### 1.4 Enable RLS + policies on every public table
- `ENABLE ROW LEVEL SECURITY` on all 9 tables + `show_photo`.
- **Public read** (SELECT `USING (true)`) on: `artist`, `venue`, `show`, `set`, `song`, `song_set`, `note`, `show_photo`.
- **Admin write** (INSERT/UPDATE/DELETE `USING (public.is_admin()) WITH CHECK (public.is_admin())`) on the same tables.
- `public.user`:
  - SELECT: `auth.uid() = id OR public.is_admin()`
  - UPDATE: `auth.uid() = id` (self only)
  - INSERT/DELETE: service role only (trigger handles insert; no client delete).
- `public.user_show`:
  - SELECT: `auth.uid() = user_id OR public.is_admin()`
  - INSERT/DELETE: `auth.uid() = user_id` (fan saves/unsaves own attended shows).
- **Storage `media` bucket**: public SELECT; INSERT/UPDATE/DELETE gated on `public.is_admin()`.

### 1.5 TypeScript types
After migrations: `mcp__supabase__generate_typescript_types` → save to `lib/supabase/types.ts`. Import in client/server helpers.

## 2. Server helpers & middleware

### 2.1 New `lib/supabase/admin.ts`
`requireAdmin()` — calls `supabase.auth.getUser()`, reads `user.app_metadata.role`, throws/redirects if not `'admin'`. Used by every `/admin` page and server action.

### 2.2 Update `lib/supabase/middleware.ts`
Existing logic already redirects unauthenticated requests. Add: if `request.nextUrl.pathname.startsWith('/admin')` and the user's `app_metadata.role !== 'admin'`, redirect to `/`. Keep `user.getUser()` call intact (the file's own comments warn not to move it).

### 2.3 Typed server client
Pass the generated `Database` type to `createServerClient`/`createBrowserClient` in `lib/supabase/server.ts` and `lib/supabase/client.ts` so queries are type-safe across the admin UI.

## 3. Admin UI — `/admin` route group

### 3.1 `app/admin/layout.tsx`
Server component. Calls `requireAdmin()`. Renders a sidebar with links: New Show, Artists, Venues, Songs.

### 3.2 `app/admin/shows/new/page.tsx` — the main feature (setlist builder)
Single-page flow that writes to `show`, `set`, `song_set`, and optionally `artist`/`venue`/`song`/`note`. Client component using server actions for writes.

Structure:
1. **Show header**: date (required), showtime, venue picker, artist picker, notes (free text).
2. **Sets list**: add one or more sets. Each set has `set_number` (auto), `is_encore` toggle, and a songs list.
3. **Songs in a set**: ordered list. Each row: song picker, transition text (free-form input with quick-insert buttons for `→`, `>`, `,`), optional per-song note (marker + content).
4. **Submit**: server action transactionally inserts `show` → `set`s → `song_set`s, creating any inline-created entities first and reusing their returned ids.

Reusable inline-create pattern — `components/admin/InlineCreateCombobox.tsx`:
- Props: `{ table, labelField, renderExtraFields, onCreated }`.
- Command-menu style list with search; bottom item is "+ Create new {table}". Selecting it opens a small inline form (e.g., for venue: name, address1, city, state, zip). On submit, calls a server action that inserts the row (RLS-gated to admin) and returns the new id; combobox selects it automatically.
- Used for: artist picker, venue picker (extra fields: address/city/state/zip), song picker (extra fields: title — artist defaults to show's artist).

The project already has `@radix-ui/react-dropdown-menu`; add `cmdk` for the command-menu primitive (or hand-roll with Radix + filter — prefer `cmdk` for speed, it's ~3kb).

### 3.3 Standalone forms
- `app/admin/artists/new/page.tsx` — name + optional cover image upload.
- `app/admin/venues/new/page.tsx` — address fields.
- `app/admin/songs/new/page.tsx` — title + artist picker.
Each is a thin wrapper around the same server actions used by inline-create.

### 3.4 Image upload
- `components/admin/ImageUpload.tsx` — uses `supabase.storage.from('media').upload(path, file)`. On success stores the returned `path` in the form state; on submit the path is written to `artist.image_path` / `show.image_path` / `show_photo.path`. Client-side size + mime check, server-side RLS is the real gate.

### 3.5 Server actions (`app/admin/_actions.ts`)
One file exporting `createArtist`, `createVenue`, `createSong`, `createShowWithSetlist`, `addShowPhoto`. Each calls `requireAdmin()` first, then uses the server Supabase client. `createShowWithSetlist` inserts in dependency order and returns ids to the client for confirmation/redirect.

## 4. Fan-facing UI

### 4.1 Public content pages (build as separate task; schema + RLS unblocks them)
- `app/shows/page.tsx` — list of shows.
- `app/shows/[id]/page.tsx` — full setlist with transitions, notes, photos.
- `app/artists/[id]/page.tsx` — artist bio + shows + songs.

### 4.2 `app/profile/page.tsx` — fan stats
Server component; `requireUser()` (non-admin OK). Queries `user_show` joined to `show` / `set` / `song_set` / `song` / `venue`.
- **Total shows attended**: `count(user_show)`.
- **Songs heard + rarities**: group `song_set.song_id` across attended shows. "Rarity" = `(times this song appears in that artist's full show history) / (total shows by artist)`. Lower % = rarer. Show top 5 rarest.
- **Venues / cities**: `count(distinct venue_id)`, `count(distinct venue.city)`.
- **Timeline**: ordered list of attended shows with date/venue/setlist preview.

Add a "Save to my shows" / "Remove" button on `app/shows/[id]/page.tsx` that inserts/deletes a `user_show` row (RLS ensures `auth.uid() = user_id`).

### 4.3 Header/nav updates (`components/Header.tsx`)
- Existing socials/music/shows/about links stay.
- Add conditional items:
  - Logged out: "Sign in" (already handled by `auth-button.tsx` pattern).
  - Logged in fan: "Profile" + "Log out".
  - Logged in admin: "Profile" + "Admin" + "Log out".
  - Role detected via server-rendered `AuthButton` using `user.app_metadata.role`.

## 5. Auth flow adjustments

- `components/sign-up-form.tsx` — add optional `display_name` field; pass as `options.data.display_name` so the signup trigger can use it.
- Keep `/auth/sign-up` public. Sign-ups get `role` absent / null → treated as fan.
- Delete the placeholder `app/protected/page.tsx`; replace with `/profile`.
- Verify `emailRedirectTo` points somewhere sensible (currently `/protected` — change to `/profile`).

## 6. Critical files

**Modify**
- `lib/supabase/middleware.ts` (admin gate on `/admin/*`)
- `lib/supabase/client.ts`, `lib/supabase/server.ts` (typed `Database` generic)
- `components/Header.tsx` (conditional nav)
- `components/auth-button.tsx` (expose role-aware links)
- `components/sign-up-form.tsx` (display_name field, redirect target)
- `components/login-form.tsx` (redirect target `/profile`)
- `lib/supabase/supabase_public_only.sql` (regenerate reference dump after migrations)

**Create**
- `lib/supabase/admin.ts` (`requireAdmin`, `requireUser`)
- `lib/supabase/types.ts` (generated)
- `app/admin/layout.tsx`
- `app/admin/shows/new/page.tsx`
- `app/admin/artists/new/page.tsx`, `app/admin/venues/new/page.tsx`, `app/admin/songs/new/page.tsx`
- `app/admin/_actions.ts` (server actions)
- `app/profile/page.tsx`
- `app/shows/page.tsx`, `app/shows/[id]/page.tsx` (can land in a follow-up, but schema/RLS lands here)
- `components/admin/SetlistBuilder.tsx`
- `components/admin/InlineCreateCombobox.tsx`
- `components/admin/ImageUpload.tsx`
- `components/ui/command.tsx` (cmdk wrapper, shadcn-style)

**Delete**
- `app/protected/page.tsx` (superseded by `/profile`)

## 7. Phasing

Given the size, ship in two PRs:

**PR 1 — foundation**: migrations (1.1–1.4), typed clients (1.5, 2.3), admin helper + middleware (2.1, 2.2), admin layout + the show/setlist builder + inline-create combobox + image upload (3.1–3.5), nav + login redirect (5). This unblocks data entry.

**PR 2 — fan experience**: public `/shows` pages, `/profile` stats, save-show button (4.1–4.3).

## 8. Verification

After PR 1:
- `mcp__supabase__list_migrations` shows the new migrations applied.
- `mcp__supabase__execute_sql`: `SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname='public';` → all `true`.
- `mcp__supabase__execute_sql`: `SELECT public.is_admin();` while running as your JWT — `true`. Run as a second test user — `false`.
- `mcp__supabase__get_advisors` (security lint) after migration to confirm no policies are missing.
- In the running dev server:
  - Log in as admin → `/admin/shows/new` renders; non-admin → redirected to `/`.
  - Create a venue inline → combobox reflects it immediately; row appears via `mcp__supabase__execute_sql SELECT * FROM public.venue`.
  - Submit a full show with 2 sets + encore → all rows present with correct FK links; image stored in Storage `media` bucket and `show.image_path` populated.
  - Try to hit the admin server action from a second (fan) browser session — should 403 / redirect.
- Type check: `pnpm build` passes with typed Supabase generics.

After PR 2:
- Save a show as a fan → row in `user_show`, stats on `/profile` update.
- Fan cannot read another fan's `user_show` (verify with two sessions + a raw SELECT).
- Admin can still see everything.
