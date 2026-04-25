'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { ComboboxItem } from '@/components/admin/Combobox';
import { SongRowEditor } from '@/components/admin/SongRowEditor';
import { type SetRow, useSetlistStore } from '@/components/admin/setlist-store';
import { Button } from '@/components/ui/button';

export function SetCard({
	set,
	index,
	canRemove,
	defaultArtist,
}: {
	set: SetRow;
	index: number;
	canRemove: boolean;
	defaultArtist: ComboboxItem | null;
}) {
	const updateSet = useSetlistStore((s) => s.updateSet);
	const removeSet = useSetlistStore((s) => s.removeSet);
	const addSong = useSetlistStore((s) => s.addSong);

	return (
		<div className="p-4 rounded-lg border border-white/10 bg-white/5">
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
					{set.is_encore ? 'Encore' : `Set ${index + 1}`}
				</h3>
				<div className="flex items-center gap-3">
					<label className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={set.is_encore}
							onChange={(e) =>
								updateSet(set.key, { is_encore: e.target.checked })
							}
						/>
						Encore
					</label>
					{canRemove && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => removeSet(set.key)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				{set.songs.map((sg, i) => (
					<SongRowEditor
						key={sg.key}
						setKey={set.key}
						row={sg}
						isLast={i === set.songs.length - 1}
						defaultArtist={defaultArtist}
					/>
				))}
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="w-fit"
					onClick={() => addSong(set.key)}
				>
					<Plus className="h-4 w-4 mr-1" />
					Add song
				</Button>
			</div>
		</div>
	);
}
