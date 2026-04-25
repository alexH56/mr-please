'use client';

import * as React from 'react';
import { createArtist, createSong, createVenue } from '@/app/admin/_actions';
import { Combobox, type ComboboxItem } from '@/components/admin/Combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

// `%` and `_` are LIKE metacharacters — escape so a user typing `100%`
// doesn't silently match every row.
function escapeLike(q: string): string {
	return q.trim().replace(/[\\%_]/g, '\\$&');
}

async function searchArtists(q: string): Promise<ComboboxItem[]> {
	const supabase = createClient();
	let query = supabase
		.from('artist')
		.select('id, name')
		.order('name', { ascending: true })
		.limit(30);
	const escaped = escapeLike(q);
	if (escaped) query = query.ilike('name', `%${escaped}%`);
	const { data, error } = await query;
	if (error) return [];
	return (data ?? []).map((r) => ({ id: r.id, label: r.name }));
}

async function searchVenues(q: string): Promise<ComboboxItem[]> {
	const supabase = createClient();
	let query = supabase
		.from('venue')
		.select('id, name, city, state')
		.order('name', { ascending: true })
		.limit(30);
	const escaped = escapeLike(q);
	if (escaped) query = query.ilike('name', `%${escaped}%`);
	const { data, error } = await query;
	if (error) return [];
	return (data ?? []).map((r) => ({
		id: r.id,
		label: r.name,
		sublabel: `${r.city}, ${r.state}`,
	}));
}

async function searchSongs(q: string): Promise<ComboboxItem[]> {
	const supabase = createClient();
	let query = supabase
		.from('song')
		.select('id, title, artist_name')
		.order('title', { ascending: true })
		.limit(30);
	const escaped = escapeLike(q);
	if (escaped) query = query.ilike('title', `%${escaped}%`);
	const { data, error } = await query;
	if (error) return [];
	return (data ?? []).map((r) => ({
		id: r.id,
		label: r.title,
		sublabel: r.artist_name,
	}));
}

export function ArtistPicker({
	value,
	onChange,
}: {
	value: ComboboxItem | null;
	onChange: (v: ComboboxItem | null) => void;
}) {
	return (
		<Combobox
			value={value}
			onChange={onChange}
			placeholder="Select artist…"
			search={searchArtists}
			createLabel="Create artist"
			create={{
				mode: 'inline',
				renderCreateForm: ({ initialQuery, onCreated, onCancel }) => (
					<ArtistCreateForm
						initialName={initialQuery}
						onCreated={onCreated}
						onCancel={onCancel}
					/>
				),
			}}
		/>
	);
}

function ArtistCreateForm({
	initialName,
	onCreated,
	onCancel,
}: {
	initialName: string;
	onCreated: (item: ComboboxItem) => void;
	onCancel: () => void;
}) {
	const [name, setName] = React.useState(initialName);
	const [busy, setBusy] = React.useState(false);
	const [err, setErr] = React.useState<string | null>(null);

	const submit = async () => {
		if (!name.trim()) return;
		setBusy(true);
		setErr(null);
		try {
			const row = await createArtist({ name });
			onCreated({ id: row.id, label: row.name });
		} catch (e) {
			setErr(e instanceof Error ? e.message : 'Failed');
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="grid gap-1">
				<Label htmlFor="artist-name">Artist name</Label>
				<Input
					id="artist-name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoFocus
				/>
			</div>
			{err && <p className="text-xs text-red-500">{err}</p>}
			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={onCancel}
					disabled={busy}
				>
					Cancel
				</Button>
				<Button
					type="button"
					size="sm"
					onClick={submit}
					disabled={busy || !name.trim()}
				>
					{busy ? 'Creating…' : 'Create'}
				</Button>
			</div>
		</div>
	);
}

export function VenuePicker({
	value,
	onChange,
}: {
	value: ComboboxItem | null;
	onChange: (v: ComboboxItem | null) => void;
}) {
	return (
		<Combobox
			value={value}
			onChange={onChange}
			placeholder="Select venue…"
			search={searchVenues}
			createLabel="Create venue"
			create={{
				mode: 'inline',
				renderCreateForm: ({ initialQuery, onCreated, onCancel }) => (
					<VenueCreateForm
						initialName={initialQuery}
						onCreated={onCreated}
						onCancel={onCancel}
					/>
				),
			}}
		/>
	);
}

function VenueCreateForm({
	initialName,
	onCreated,
	onCancel,
}: {
	initialName: string;
	onCreated: (item: ComboboxItem) => void;
	onCancel: () => void;
}) {
	const [name, setName] = React.useState(initialName);
	const [address1, setAddress1] = React.useState('');
	const [address2, setAddress2] = React.useState('');
	const [city, setCity] = React.useState('');
	const [state, setState] = React.useState('');
	const [zip, setZip] = React.useState('');
	const [busy, setBusy] = React.useState(false);
	const [err, setErr] = React.useState<string | null>(null);

	const canSubmit = Boolean(
		name.trim() && address1.trim() && city.trim() && state.trim() && zip.trim(),
	);

	const submit = async () => {
		if (!canSubmit) return;
		setBusy(true);
		setErr(null);
		try {
			const row = await createVenue({
				name,
				address1,
				address2: address2 || null,
				city,
				state,
				zip,
			});
			onCreated({
				id: row.id,
				label: row.name,
				sublabel: `${row.city}, ${row.state}`,
			});
		} catch (e) {
			setErr(e instanceof Error ? e.message : 'Failed');
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="grid gap-1">
				<Label htmlFor="venue-name">Name</Label>
				<Input
					id="venue-name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoFocus
				/>
			</div>
			<div className="grid gap-1">
				<Label htmlFor="venue-address1">Address</Label>
				<Input
					id="venue-address1"
					value={address1}
					onChange={(e) => setAddress1(e.target.value)}
				/>
			</div>
			<div className="grid gap-1">
				<Label htmlFor="venue-address2">Address 2 (optional)</Label>
				<Input
					id="venue-address2"
					value={address2}
					onChange={(e) => setAddress2(e.target.value)}
				/>
			</div>
			<div className="grid grid-cols-[1fr_auto_auto] gap-2">
				<div className="grid gap-1">
					<Label htmlFor="venue-city">City</Label>
					<Input
						id="venue-city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<div className="grid gap-1">
					<Label htmlFor="venue-state">State</Label>
					<Input
						id="venue-state"
						value={state}
						onChange={(e) => setState(e.target.value.toUpperCase())}
						className="w-16 uppercase"
						maxLength={3}
					/>
				</div>
				<div className="grid gap-1">
					<Label htmlFor="venue-zip">ZIP</Label>
					<Input
						id="venue-zip"
						value={zip}
						onChange={(e) => setZip(e.target.value)}
						className="w-24"
					/>
				</div>
			</div>
			{err && <p className="text-xs text-red-500">{err}</p>}
			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={onCancel}
					disabled={busy}
				>
					Cancel
				</Button>
				<Button
					type="button"
					size="sm"
					onClick={submit}
					disabled={busy || !canSubmit}
				>
					{busy ? 'Creating…' : 'Create'}
				</Button>
			</div>
		</div>
	);
}

export function SongPicker({
	defaultArtist,
	value,
	onChange,
}: {
	defaultArtist?: ComboboxItem | null;
	value: ComboboxItem | null;
	onChange: (v: ComboboxItem | null) => void;
}) {
	return (
		<Combobox
			value={value}
			onChange={onChange}
			placeholder="Select song…"
			search={searchSongs}
			createLabel="Create song"
			create={{
				mode: 'inline',
				renderCreateForm: ({ initialQuery, onCreated, onCancel }) => (
					<SongCreateForm
						defaultArtist={defaultArtist ?? null}
						initialTitle={initialQuery}
						onCreated={onCreated}
						onCancel={onCancel}
					/>
				),
			}}
		/>
	);
}

function SongCreateForm({
	defaultArtist,
	initialTitle,
	onCreated,
	onCancel,
}: {
	defaultArtist: ComboboxItem | null;
	initialTitle: string;
	onCreated: (item: ComboboxItem) => void;
	onCancel: () => void;
}) {
	const [title, setTitle] = React.useState(initialTitle);
	const [artist, setArtist] = React.useState<ComboboxItem | null>(
		defaultArtist,
	);
	const [busy, setBusy] = React.useState(false);
	const [err, setErr] = React.useState<string | null>(null);

	const canSubmit = Boolean(title.trim() && artist);

	const submit = async () => {
		if (!canSubmit || !artist) return;
		setBusy(true);
		setErr(null);
		try {
			const row = await createSong({ title, artist_id: artist.id });
			onCreated({ id: row.id, label: row.title, sublabel: artist.label });
		} catch (e) {
			setErr(e instanceof Error ? e.message : 'Failed');
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="grid gap-1">
				<Label htmlFor="song-title">Song title</Label>
				<Input
					id="song-title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					autoFocus
				/>
			</div>
			<div className="grid gap-1">
				<Label>Artist</Label>
				<ArtistPicker value={artist} onChange={setArtist} />
			</div>
			{err && <p className="text-xs text-red-500">{err}</p>}
			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={onCancel}
					disabled={busy}
				>
					Cancel
				</Button>
				<Button
					type="button"
					size="sm"
					onClick={submit}
					disabled={busy || !canSubmit}
				>
					{busy ? 'Creating…' : 'Create'}
				</Button>
			</div>
		</div>
	);
}
