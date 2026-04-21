CREATE TABLE public.artist (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.note (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    marker text NOT NULL,
    content text NOT NULL
);
CREATE TABLE public.set (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    show_id uuid NOT NULL,
    set_number integer NOT NULL,
    is_encore boolean DEFAULT false NOT NULL
);
CREATE TABLE public.show (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    artist_id uuid NOT NULL,
    venue_id uuid NOT NULL,
    venue_name text NOT NULL,
    date date NOT NULL,
    showtime timestamp without time zone,
    notes text,
    artist_name text NOT NULL
);
CREATE TABLE public.song (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    artist_name text NOT NULL,
    artist_id uuid NOT NULL
);
CREATE TABLE public.song_set (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    song_id uuid NOT NULL,
    song_title text NOT NULL,
    set_id uuid NOT NULL,
    "order" smallint NOT NULL,
    transition text,
    note uuid
);
CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    email_address text NOT NULL,
    display_name text NOT NULL,
    first_name text,
    last_name text,
    city text,
    state text,
    zip text,
    country text
);
CREATE TABLE public.user_show (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL,
    show_id uuid NOT NULL
);
CREATE TABLE public.venue (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    address1 text NOT NULL,
    address2 text,
    city text NOT NULL,
    state text NOT NULL,
    zip text NOT NULL
);
COPY public.artist (id, created_at, name) FROM stdin;
\.
COPY public.note (id, created_at, marker, content) FROM stdin;
\.
COPY public.set (id, created_at, show_id, set_number, is_encore) FROM stdin;
\.
COPY public.show (id, created_at, artist_id, venue_id, venue_name, date, showtime, notes, artist_name) FROM stdin;
\.
COPY public.song (id, created_at, title, artist_name, artist_id) FROM stdin;
\.
COPY public.song_set (id, created_at, song_id, song_title, set_id, "order", transition, note) FROM stdin;
\.
COPY public."user" (id, created_at, email_address, display_name, first_name, last_name, city, state, zip, country) FROM stdin;
\.
COPY public.user_show (id, created_at, user_id, show_id) FROM stdin;
\.
COPY public.venue (id, created_at, name, address1, address2, city, state, zip) FROM stdin;
\.
CREATE INDEX set_show_id_idx ON public.set USING btree (show_id);
CREATE INDEX show_artist_id_idx ON public.show USING btree (artist_id);
CREATE INDEX show_artist_name_idx ON public.show USING btree (artist_name);
CREATE INDEX show_venue_id_idx ON public.show USING btree (venue_id);
CREATE INDEX song_artist_id_idx ON public.song USING btree (artist_id);
CREATE INDEX song_artist_name_idx ON public.song USING btree (artist_name);
CREATE INDEX song_set_note_idx ON public.song_set USING btree (note);
CREATE INDEX song_set_set_id_idx ON public.song_set USING btree (set_id);
CREATE INDEX song_set_song_id_idx ON public.song_set USING btree (song_id);
CREATE INDEX user_show_show_id_idx ON public.user_show USING btree (show_id);
CREATE INDEX user_show_user_id_idx ON public.user_show USING btree (user_id);
