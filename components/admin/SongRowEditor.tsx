'use client';

import { Plus, Trash2, X } from 'lucide-react';
import * as React from 'react';
import type { ComboboxItem } from '@/components/admin/Combobox';
import { SongPicker } from '@/components/admin/Pickers';
import {
	type SongRow,
	useSetlistStore,
} from '@/components/admin/setlist-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TRANSITIONS = [',', '>', '→'];

export function SongRowEditor({
	setKey,
	row,
	isLast,
	defaultArtist,
}: {
	setKey: string;
	row: SongRow;
	isLast: boolean;
	defaultArtist: ComboboxItem | null;
}) {
	const updateSong = useSetlistStore((s) => s.updateSong);
	const removeSong = useSetlistStore((s) => s.removeSong);
	const [notesOpen, setNotesOpen] = React.useState(
		Boolean(row.noteMarker || row.noteContent),
	);

	return (
		<div className="grid gap-2 p-3 rounded-md bg-black/20">
			<div className="grid grid-cols-[1fr_auto] gap-2">
				<SongPicker
					defaultArtist={defaultArtist}
					value={row.song}
					onChange={(v) => updateSong(setKey, row.key, { song: v ?? null })}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => removeSong(setKey, row.key)}
					aria-label="Remove song"
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>

			{!isLast && (
				<div className="flex items-center gap-2">
					<Label className="text-xs text-gray-400 w-20">Transition</Label>
					<div className="flex gap-1">
						{TRANSITIONS.map((t) => (
							<Button
								key={t}
								type="button"
								variant={row.transition === t ? 'default' : 'outline'}
								size="sm"
								className="h-7 px-2"
								onClick={() =>
									updateSong(setKey, row.key, {
										transition: row.transition === t ? '' : t,
									})
								}
							>
								{t}
							</Button>
						))}
						<Input
							value={row.transition}
							onChange={(e) =>
								updateSong(setKey, row.key, { transition: e.target.value })
							}
							placeholder="custom"
							className="h-7 w-24 text-xs"
						/>
					</div>
				</div>
			)}

			{notesOpen ? (
				<div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
					<Input
						value={row.noteMarker}
						onChange={(e) =>
							updateSong(setKey, row.key, { noteMarker: e.target.value })
						}
						placeholder="*"
						className="h-7 w-12 text-xs"
					/>
					<Input
						value={row.noteContent}
						onChange={(e) =>
							updateSong(setKey, row.key, { noteContent: e.target.value })
						}
						placeholder="Note (e.g. with guest, first time played)"
						className="h-7 text-xs"
					/>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="h-7 w-7 p-0"
						onClick={() => {
							updateSong(setKey, row.key, {
								noteMarker: '',
								noteContent: '',
							});
							setNotesOpen(false);
						}}
						aria-label="Remove note"
					>
						<X className="h-3.5 w-3.5" />
					</Button>
				</div>
			) : (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="w-fit h-7 px-2 text-xs text-gray-400"
					onClick={() => setNotesOpen(true)}
				>
					<Plus className="h-3 w-3 mr-1" />
					Add note
				</Button>
			)}
		</div>
	);
}
