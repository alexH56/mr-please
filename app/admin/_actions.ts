'use server';

import { revalidatePath } from 'next/cache';
import {
	type AddShowPhotoInput,
	type ArtistInput,
	addShowPhotoSchema,
	artistInputSchema,
	type ShowWithSetlistInput,
	type SongInput,
	showWithSetlistSchema,
	songInputSchema,
	type VenueInput,
	venueInputSchema,
} from '@/lib/schemas/admin';
import { requireAdmin } from '@/lib/supabase/admin';

export async function createArtist(input: ArtistInput) {
	const parsed = artistInputSchema.parse(input);
	const { supabase } = await requireAdmin();
	const { data, error } = await supabase
		.from('artist')
		.insert({ name: parsed.name, image_path: parsed.image_path ?? null })
		.select('id, name')
		.single();
	if (error) throw new Error(error.message);
	revalidatePath('/admin');
	return data;
}

export async function createVenue(input: VenueInput) {
	const parsed = venueInputSchema.parse(input);
	const { supabase } = await requireAdmin();
	const { data, error } = await supabase
		.from('venue')
		.insert({
			name: parsed.name,
			address1: parsed.address1,
			address2: parsed.address2 ?? null,
			city: parsed.city,
			state: parsed.state,
			zip: parsed.zip,
		})
		.select('id, name, city, state')
		.single();
	if (error) throw new Error(error.message);
	revalidatePath('/admin');
	return data;
}

export async function createSong(input: SongInput) {
	const parsed = songInputSchema.parse(input);
	const { supabase } = await requireAdmin();
	const { data: artist, error: artistErr } = await supabase
		.from('artist')
		.select('id, name')
		.eq('id', parsed.artist_id)
		.single();
	if (artistErr || !artist) throw new Error('Artist not found');

	const { data, error } = await supabase
		.from('song')
		.insert({
			title: parsed.title,
			artist_id: artist.id,
			artist_name: artist.name,
		})
		.select('id, title, artist_id, artist_name')
		.single();
	if (error) throw new Error(error.message);
	revalidatePath('/admin');
	return data;
}

export async function createShowWithSetlist(input: ShowWithSetlistInput) {
	const parsed = showWithSetlistSchema.parse(input);
	const { supabase } = await requireAdmin();

	const { data: showId, error } = await supabase.rpc(
		'create_show_with_setlist',
		{ payload: parsed },
	);
	if (error || !showId) {
		throw new Error(error?.message ?? 'Failed to create show');
	}

	revalidatePath('/admin');
	revalidatePath('/shows');
	return { show_id: showId };
}

export async function addShowPhoto(input: AddShowPhotoInput) {
	const parsed = addShowPhotoSchema.parse(input);
	const { supabase } = await requireAdmin();
	const { data, error } = await supabase
		.from('show_photo')
		.insert({
			show_id: parsed.show_id,
			path: parsed.path,
			caption: parsed.caption ?? null,
		})
		.select('id')
		.single();
	if (error) throw new Error(error.message);
	revalidatePath('/admin');
	return data;
}
