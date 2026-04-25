import { create } from 'zustand';

import type { ComboboxItem } from '@/components/admin/Combobox';

export type SongRow = {
	key: string;
	song: ComboboxItem | null;
	transition: string;
	noteMarker: string;
	noteContent: string;
};

export type SetRow = {
	key: string;
	is_encore: boolean;
	songs: SongRow[];
};

const newKey = () => crypto.randomUUID();

export const emptySong = (): SongRow => ({
	key: newKey(),
	song: null,
	transition: ',',
	noteMarker: '',
	noteContent: '',
});

export const emptySet = (is_encore = false): SetRow => ({
	key: newKey(),
	is_encore,
	songs: [emptySong()],
});

type State = {
	artist: ComboboxItem | null;
	venue: ComboboxItem | null;
	date: string;
	time: string;
	notes: string;
	imagePath: string | null;
	sets: SetRow[];
};

type Actions = {
	setArtist: (v: ComboboxItem | null) => void;
	setVenue: (v: ComboboxItem | null) => void;
	setDate: (v: string) => void;
	setTime: (v: string) => void;
	setNotes: (v: string) => void;
	setImagePath: (v: string | null) => void;

	addSet: (is_encore: boolean) => void;
	removeSet: (key: string) => void;
	updateSet: (key: string, patch: Partial<Omit<SetRow, 'key' | 'songs'>>) => void;

	addSong: (setKey: string) => void;
	removeSong: (setKey: string, songKey: string) => void;
	updateSong: (
		setKey: string,
		songKey: string,
		patch: Partial<Omit<SongRow, 'key'>>,
	) => void;

	reset: () => void;
};

const initial: State = {
	artist: null,
	venue: null,
	date: '',
	time: '',
	notes: '',
	imagePath: null,
	sets: [emptySet()],
};

export const useSetlistStore = create<State & Actions>((set) => ({
	...initial,

	setArtist: (v) => set({ artist: v }),
	setVenue: (v) => set({ venue: v }),
	setDate: (v) => set({ date: v }),
	setTime: (v) => set({ time: v }),
	setNotes: (v) => set({ notes: v }),
	setImagePath: (v) => set({ imagePath: v }),

	addSet: (is_encore) =>
		set((s) => ({ sets: [...s.sets, emptySet(is_encore)] })),
	removeSet: (key) =>
		set((s) => ({ sets: s.sets.filter((x) => x.key !== key) })),
	updateSet: (key, patch) =>
		set((s) => ({
			sets: s.sets.map((x) => (x.key === key ? { ...x, ...patch } : x)),
		})),

	addSong: (setKey) =>
		set((s) => ({
			sets: s.sets.map((x) =>
				x.key === setKey ? { ...x, songs: [...x.songs, emptySong()] } : x,
			),
		})),
	removeSong: (setKey, songKey) =>
		set((s) => ({
			sets: s.sets.map((x) =>
				x.key === setKey
					? { ...x, songs: x.songs.filter((sg) => sg.key !== songKey) }
					: x,
			),
		})),
	updateSong: (setKey, songKey, patch) =>
		set((s) => ({
			sets: s.sets.map((x) =>
				x.key === setKey
					? {
							...x,
							songs: x.songs.map((sg) =>
								sg.key === songKey ? { ...sg, ...patch } : sg,
							),
						}
					: x,
			),
		})),

	reset: () => set({ ...initial, sets: [emptySet()] }),
}));
