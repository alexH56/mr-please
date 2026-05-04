export type SetlistNote = {
	id: string;
	marker: string;
	content: string;
};

export type SetlistSong = {
	id: string;
	song_id: string;
	song_title: string;
	transition: string | null;
	note: SetlistNote | null;
	order: number;
};

export type SetlistSet = {
	id: string;
	set_number: number;
	is_encore: boolean;
	songs: SetlistSong[];
};

export function SetlistView({ sets }: { sets: SetlistSet[] }) {
	if (!sets.length) {
		return <p className="text-sm text-gray-500 italic">No setlist on file.</p>;
	}

	const footnotes: SetlistNote[] = [];
	const seen = new Set<string>();
	for (const set of sets) {
		for (const song of set.songs) {
			if (song.note && !seen.has(song.note.id)) {
				seen.add(song.note.id);
				footnotes.push(song.note);
			}
		}
	}

	return (
		<div className="flex flex-col gap-6">
			{sets.map((set) => (
				<div key={set.id}>
					<h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
						{set.is_encore ? 'Encore' : `Set ${set.set_number}`}
					</h3>
					<p className="text-base leading-relaxed">
						{set.songs.map((song, i) => {
							const isLast = i === set.songs.length - 1;
							const transition = (song.transition ?? '').trim();
							return (
								<span key={song.id}>
									<span className="text-gray-100">{song.song_title}</span>
									{song.note && (
										<sup className="ml-0.5 text-yellow-400">
											{song.note.marker}
										</sup>
									)}
									{!isLast && (
										<span className="mx-1.5 text-gray-500">
											{transition || ','}
										</span>
									)}
								</span>
							);
						})}
					</p>
				</div>
			))}

			{footnotes.length > 0 && (
				<div className="pt-4 border-t border-white/10 text-sm text-gray-400 flex flex-col gap-1">
					{footnotes.map((n) => (
						<p key={n.id}>
							<span className="text-yellow-400 mr-1">{n.marker}</span>
							{n.content}
						</p>
					))}
				</div>
			)}
		</div>
	);
}
