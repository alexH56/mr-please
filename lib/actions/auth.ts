'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

export type AuthState = { error: string | null };

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(1, 'Password is required'),
	next: z.string().optional(),
});

const signUpSchema = z
	.object({
		email: z.email(),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		repeatPassword: z.string(),
		displayName: z.string().optional(),
	})
	.refine((d) => d.password === d.repeatPassword, {
		message: 'Passwords do not match',
		path: ['repeatPassword'],
	});

export async function loginAction(
	_prev: AuthState,
	formData: FormData,
): Promise<AuthState> {
	const parsed = loginSchema.safeParse(Object.fromEntries(formData));
	if (!parsed.success) {
		return { error: parsed.error.issues[0]?.message ?? 'Invalid input' };
	}
	const { email, password, next } = parsed.data;

	const supabase = await createClient();
	const { error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) return { error: error.message };

	redirect(next?.startsWith('/') ? next : '/profile');
}

export async function signUpAction(
	_prev: AuthState,
	formData: FormData,
): Promise<AuthState> {
	const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
	if (!parsed.success) {
		return { error: parsed.error.issues[0]?.message ?? 'Invalid input' };
	}
	const { email, password, displayName } = parsed.data;

	const origin = (await headers()).get('origin') ?? '';
	const supabase = await createClient();
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/confirm?next=/profile`,
			data: displayName?.trim()
				? { display_name: displayName.trim() }
				: undefined,
		},
	});
	if (error) return { error: error.message };

	redirect('/auth/sign-up-success');
}
