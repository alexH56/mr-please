import {
	type CookieMethodsServer,
	type CookieOptions,
	createServerClient,
} from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseEnv } from '@/lib/supabase/env';

export async function createClient() {
	const cookieStore = await cookies();

	const { url, anonKey } = getSupabaseEnv();

	return createServerClient(url, anonKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(
				cookiesToSet: { name: string; value: string; options: CookieOptions }[],
			) {
				try {
					for (const { name, value, options } of cookiesToSet) {
						cookieStore.set(name, value, options);
					}
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
		} satisfies CookieMethodsServer,
	});
}
