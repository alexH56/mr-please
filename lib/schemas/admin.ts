import { z } from 'zod';

export const uuid = z.uuid();

export const artistInputSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	image_path: z.string().nullable().optional(),
});
export type ArtistInput = z.infer<typeof artistInputSchema>;

export const venueInputSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	address1: z.string().trim().min(1, 'Address is required'),
	address2: z.string().nullable().optional(),
	city: z.string().trim().min(1, 'City is required'),
	state: z.string().trim().min(1, 'State is required'),
	zip: z.string().trim().min(1, 'ZIP is required'),
});
export type VenueInput = z.infer<typeof venueInputSchema>;

export const songInputSchema = z.object({
	title: z.string().trim().min(1, 'Title is required'),
	artist_id: uuid,
});
export type SongInput = z.infer<typeof songInputSchema>;

export const noteDraftSchema = z.object({
	marker: z.string().trim().min(1, 'Marker required').max(8),
	content: z.string().trim().min(1, 'Note content required').max(2000),
});
export type NoteDraftInput = z.infer<typeof noteDraftSchema>;

export const songSetDraftSchema = z.object({
	song_id: uuid,
	song_title: z.string().min(1),
	transition: z.string().nullable().optional(),
	note: noteDraftSchema.nullable().optional(),
});
export type SongSetDraftInput = z.infer<typeof songSetDraftSchema>;

export const setDraftSchema = z.object({
	is_encore: z.boolean(),
	songs: z.array(songSetDraftSchema).min(1, 'Add at least one song'),
});
export type SetDraftInput = z.infer<typeof setDraftSchema>;

export const showWithSetlistSchema = z.object({
	artist_id: z.uuid('Artist is required'),
	venue_id: z.uuid('Venue is required'),
	date: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'Date is required'),
	showtime: z
		.string()
		.regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Pick a valid time')
		.nullable()
		.optional(),
	notes: z.string().nullable().optional(),
	image_path: z.string().nullable().optional(),
	sets: z.array(setDraftSchema).min(1, 'Add at least one song'),
});
export type ShowWithSetlistInput = z.infer<typeof showWithSetlistSchema>;

export const addShowPhotoSchema = z.object({
	show_id: uuid,
	path: z.string().min(1),
	caption: z.string().nullable().optional(),
});
export type AddShowPhotoInput = z.infer<typeof addShowPhotoSchema>;
