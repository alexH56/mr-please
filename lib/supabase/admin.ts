import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function requireUser() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		redirect('/auth/login');
	}
	return { supabase, user };
}

export async function requireAdmin() {
	const { supabase, user } = await requireUser();
	const role = (user.app_metadata as { role?: string } | null)?.role;
	if (role !== 'admin') {
		redirect('/');
	}
	return { supabase, user };
}

export function isAdminUser(
	user: { app_metadata?: Record<string, unknown> | null } | null | undefined,
) {
	return user?.app_metadata?.role === 'admin';
}
