'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { requireUser } from '@/lib/supabase/admin';

const showIdSchema = z.uuid();

export async function toggleSavedShow(showId: string): Promise<{
	saved: boolean;
}> {
	const id = showIdSchema.parse(showId);
	const { supabase, user } = await requireUser();

	const { data: existing, error: lookupErr } = await supabase
		.from('user_show')
		.select('id')
		.eq('user_id', user.id)
		.eq('show_id', id)
		.maybeSingle();
	if (lookupErr) throw new Error(lookupErr.message);

	if (existing) {
		const { error } = await supabase
			.from('user_show')
			.delete()
			.eq('id', existing.id);
		if (error) throw new Error(error.message);
		revalidatePath('/profile');
		revalidatePath(`/shows/${id}`);
		return { saved: false };
	}

	const { error } = await supabase
		.from('user_show')
		.insert({ user_id: user.id, show_id: id });
	if (error) throw new Error(error.message);
	revalidatePath('/profile');
	revalidatePath(`/shows/${id}`);
	return { saved: true };
}
