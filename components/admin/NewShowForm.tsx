'use client';

import { Plus } from 'lucide-react';
import * as React from 'react';
import { createShowWithSetlist } from '@/app/admin/_actions';
import type { ComboboxItem } from '@/components/admin/Combobox';
import { DatePicker } from '@/components/admin/DatePicker';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ArtistPicker, VenuePicker } from '@/components/admin/Pickers';
import { SetCard } from '@/components/admin/SetCard';
import { useSetlistStore } from '@/components/admin/setlist-store';
import { TimePicker } from '@/components/admin/TimePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showWithSetlistSchema } from '@/lib/schemas/admin';

type Status =
	| { tag: 'idle' }
	| { tag: 'busy' }
	| { tag: 'ok'; message: string }
	| { tag: 'err'; message: string };

type FieldKey = 'artist_id' | 'venue_id' | 'date' | 'sets';
type FieldErrors = Partial<Record<FieldKey, string>>;

export function NewShowForm({
	initialArtist,
}: {
	/** Default artist selection (e.g. Mr. Please) resolved on the server. */
	initialArtist?: ComboboxItem | null;
} = {}) {
	const artist = useSetlistStore((s) => s.artist);
	const venue = useSetlistStore((s) => s.venue);
	const date = useSetlistStore((s) => s.date);
	const time = useSetlistStore((s) => s.time);
	const notes = useSetlistStore((s) => s.notes);
	const imagePath = useSetlistStore((s) => s.imagePath);
	const sets = useSetlistStore((s) => s.sets);

	const {
		setArtist,
		setVenue,
		setDate,
		setTime,
		setNotes,
		setImagePath,
		addSet,
		reset,
	} = useSetlistStore.getState();

	const [status, setStatus] = React.useState<Status>({ tag: 'idle' });
	const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
	// The form relies entirely on client-only state (zustand, Radix popovers).
	// Rendering it on the server causes Radix useId drift vs the client tree,
	// so we defer to after mount. The admin form isn't user-facing, and the
	// brief blank flash is preferable to a hydration warning.
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);

	const clearFieldError = React.useCallback((key: FieldKey) => {
		setFieldErrors((prev) => {
			if (!prev[key]) return prev;
			const next = { ...prev };
			delete next[key];
			return next;
		});
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: seed-once semantics
	React.useEffect(() => {
		if (initialArtist && !useSetlistStore.getState().artist) {
			setArtist(initialArtist);
		}
	}, [initialArtist?.id]);

	// Auto-clear field errors once the user fills in the offending field.
	React.useEffect(() => {
		if (artist) clearFieldError('artist_id');
		if (venue) clearFieldError('venue_id');
		if (date) clearFieldError('date');
		if (sets.some((s) => s.songs.some((sg) => sg.song)))
			clearFieldError('sets');
	}, [artist, venue, date, sets, clearFieldError]);

	const submit = async () => {
		setStatus({ tag: 'busy' });
		setFieldErrors({});
		try {
			const snapshot = useSetlistStore.getState();

			const payloadSets = snapshot.sets
				.map((s) => ({
					is_encore: s.is_encore,
					songs: s.songs
						.filter((sg) => sg.song)
						.map((sg) => ({
							song_id: sg.song?.id,
							song_title: sg.song?.label,
							transition: sg.transition.trim() || null,
							note: sg.noteContent.trim()
								? {
										marker: sg.noteMarker.trim() || '*',
										content: sg.noteContent.trim(),
									}
								: null,
						})),
				}))
				.filter((s) => s.songs.length > 0);

			const payload = {
				artist_id: snapshot.artist?.id ?? '',
				venue_id: snapshot.venue?.id ?? '',
				date: snapshot.date,
				showtime: snapshot.time || null,
				notes: snapshot.notes.trim() || null,
				image_path: snapshot.imagePath,
				sets: payloadSets,
			};

			const parsed = showWithSetlistSchema.safeParse(payload);
			if (!parsed.success) {
				const errs: FieldErrors = {};
				for (const issue of parsed.error.issues) {
					const head = issue.path[0];
					const key: FieldKey | undefined =
						head === 'artist_id' ||
						head === 'venue_id' ||
						head === 'date' ||
						head === 'sets'
							? head
							: undefined;
					if (key && !errs[key]) errs[key] = issue.message;
				}
				setFieldErrors(errs);
				setStatus({ tag: 'idle' });
				return;
			}

			const res = await createShowWithSetlist(parsed.data);
			setStatus({ tag: 'ok', message: `Show created: ${res.show_id}` });
			reset();
		} catch (e) {
			setStatus({
				tag: 'err',
				message: e instanceof Error ? e.message : 'Failed to save show',
			});
		}
	};

	const submitting = status.tag === 'busy';

	if (!mounted) {
		return (
			<div className="flex flex-col gap-6 max-w-3xl mx-auto">
				<h1 className="text-2xl font-semibold">New show</h1>
				<div className="h-96 rounded-lg border border-white/10 bg-white/5" />
			</div>
		);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submit();
			}}
			className="flex flex-col gap-6 max-w-3xl mx-auto"
		>
			<h1 className="text-2xl font-semibold">New show</h1>

			<section className="grid gap-4 p-4 rounded-lg border border-white/10 bg-white/5">
				<h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">
					Show
				</h2>
				<div className="grid gap-3 md:grid-cols-2">
					<div className="grid gap-1">
						<Label>Artist</Label>
						<ArtistPicker value={artist} onChange={setArtist} />
						<FieldError message={fieldErrors.artist_id} />
					</div>
					<div className="grid gap-1">
						<Label>Venue</Label>
						<VenuePicker value={venue} onChange={setVenue} />
						<FieldError message={fieldErrors.venue_id} />
					</div>
					<div className="grid gap-1">
						<Label htmlFor="show-date">Date</Label>
						<DatePicker id="show-date" value={date} onChange={setDate} />
						<FieldError message={fieldErrors.date} />
					</div>
					<div className="grid gap-1">
						<Label htmlFor="show-time">Showtime (optional)</Label>
						<TimePicker id="show-time" value={time} onChange={setTime} />
					</div>
				</div>
				<div className="grid gap-1">
					<Label htmlFor="show-notes">Show Notes (optional)</Label>
					<Input
						id="show-notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					/>
				</div>
				<div className="grid gap-1">
					<Label>Cover image (optional)</Label>
					<ImageUpload
						value={imagePath}
						onChange={setImagePath}
						pathPrefix="shows/pending"
						label="Upload cover"
					/>
				</div>
			</section>

			<section className="flex flex-col gap-4">
				{sets.map((s, idx) => (
					<SetCard
						key={s.key}
						set={s}
						index={idx}
						canRemove={sets.length > 1}
						defaultArtist={artist}
					/>
				))}

				<div className="flex gap-2">
					<Button type="button" variant="outline" onClick={() => addSet(false)}>
						<Plus className="h-4 w-4 mr-1" />
						Add set
					</Button>
					<Button type="button" variant="outline" onClick={() => addSet(true)}>
						<Plus className="h-4 w-4 mr-1" />
						Add encore
					</Button>
				</div>
				<FieldError message={fieldErrors.sets} />
			</section>

			{status.tag === 'err' && (
				<p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-md">
					{status.message}
				</p>
			)}
			{status.tag === 'ok' && (
				<p className="text-sm text-green-500 bg-green-500/10 p-3 rounded-md">
					{status.message}
				</p>
			)}

			<div className="flex justify-end">
				<Button type="submit" disabled={submitting}>
					{submitting ? 'Saving…' : 'Save show'}
				</Button>
			</div>
		</form>
	);
}

function FieldError({ message }: { message?: string }) {
	if (!message) return null;
	return <p className="text-xs text-red-500">{message}</p>;
}
