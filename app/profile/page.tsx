import Link from 'next/link';

import { LogoutButton } from '@/components/logout-button';
import { ShowCard } from '@/components/ShowCard';
import { requireUser } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

type AttendedShow = {
	user_show_id: string;
	saved_at: string;
	id: string;
	date: string;
	image_path: string | null;
	venue_name: string;
	artist_id: string | null;
	artist_name: string | null;
	venue: { city: string | null; state: string | null } | null;
	songs: { song_id: string; song_title: string }[];
};

type RarestSong = {
	song_id: string;
	song_title: string;
	artist_id: string | null;
	artist_name: string | null;
	appearances: number;
	total_shows: number;
	rarity: number;
};

export default async function ProfilePage() {
	const { supabase, user } = await requireUser();

	const { data: profile } = await supabase
		.from('user')
		.select('display_name, email_address')
		.eq('id', user.id)
		.maybeSingle();

	const { data: rawAttended } = await supabase
		.from('user_show')
		.select(
			`
			id, created_at,
			show:show_id(
				id, date, image_path, venue_name, artist_id, artist_name,
				venue:venue_id(city, state),
				set(id, song_set(song_id, song_title))
			)
		`,
		)
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	const attended: AttendedShow[] = (rawAttended ?? []).flatMap((row) => {
		const show = row.show;
		if (!show) return [];
		const songs = (show.set ?? []).flatMap((set) =>
			(set.song_set ?? []).map(({ song_id, song_title }) => ({
				song_id,
				song_title,
			})),
		);
		return [
			{
				user_show_id: row.id,
				saved_at: row.created_at,
				id: show.id,
				date: show.date,
				image_path: show.image_path,
				venue_name: show.venue_name,
				venue: show.venue ?? null,
				artist_id: show.artist_id,
				artist_name: show.artist_name,
				songs,
			},
		];
	});

	const totalShows = attended.length;
	const distinctVenues = new Set(attended.map((s) => s.venue_name)).size;
	const distinctCities = new Set(
		attended.flatMap((s) =>
			s.venue?.city && s.venue?.state
				? [`${s.venue.city}, ${s.venue.state}`]
				: [],
		),
	).size;

	const heardSongIds = Array.from(
		new Set(attended.flatMap((s) => s.songs.map((sg) => sg.song_id))),
	);

	let rarestSongs: RarestSong[] = [];
	if (heardSongIds.length > 0) {
		const performingArtistIds = Array.from(
			new Set(
				attended.map((s) => s.artist_id).filter((id): id is string => !!id),
			),
		);

		const [songsRes, appearancesRes, performingShowsRes] = await Promise.all([
			supabase
				.from('song')
				.select('id, title, artist_id, artist_name')
				.in('id', heardSongIds),
			supabase
				.from('song_set')
				.select('song_id, set:set_id(show_id, show:show_id(artist_id))')
				.in('song_id', heardSongIds),
			performingArtistIds.length > 0
				? supabase
						.from('show')
						.select('id', { count: 'exact', head: true })
						.in('artist_id', performingArtistIds)
				: Promise.resolve({ count: 0 }),
		]);

		const songMeta = songsRes.data ?? [];
		const appearances = appearancesRes.data ?? [];
		const totalPerformingShows = performingShowsRes.count ?? 0;

		// Distinct show_ids per song, restricted to the performing artists
		// the user has actually seen.
		const performingArtistSet = new Set(performingArtistIds);
		const showsBySong = new Map<string, Set<string>>();
		for (const a of appearances) {
			const showId = a.set?.show_id;
			const performingArtistId = a.set?.show?.artist_id;
			if (!showId || !performingArtistId) continue;
			if (!performingArtistSet.has(performingArtistId)) continue;
			let bucket = showsBySong.get(a.song_id);
			if (!bucket) {
				bucket = new Set();
				showsBySong.set(a.song_id, bucket);
			}
			bucket.add(showId);
		}

		rarestSongs = songMeta
			.map((s): RarestSong => {
				const appearances = showsBySong.get(s.id)?.size ?? 0;
				const rarity =
					totalPerformingShows > 0 ? appearances / totalPerformingShows : 0;
				return {
					song_id: s.id,
					song_title: s.title,
					artist_id: s.artist_id,
					artist_name: s.artist_name,
					appearances,
					total_shows: totalPerformingShows,
					rarity,
				};
			})
			.sort((a, b) => a.rarity - b.rarity)
			.slice(0, 5);
	}

	const displayName = profile?.display_name ?? user.email?.split('@')[0] ?? '';

	return (
		<div className="min-h-screen pt-24 pb-16 bg-black text-gray-100">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto flex flex-col gap-8">
					<header className="flex items-center justify-between gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold">{displayName}</h1>
							<p className="text-sm text-gray-400">{user.email}</p>
						</div>
						<LogoutButton />
					</header>

					<section className="grid grid-cols-3 gap-3">
						<Stat label="Shows" value={totalShows} />
						<Stat label="Venues" value={distinctVenues} />
						<Stat label="Cities" value={distinctCities} />
					</section>

					{rarestSongs.length > 0 && (
						<section className="flex flex-col gap-3">
							<h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
								Rarest songs you've heard
							</h2>
							<ul className="flex flex-col divide-y divide-white/10 rounded-lg border border-white/10 bg-white/5">
								{rarestSongs.map((s) => (
									<li
										key={s.song_id}
										className="flex items-center justify-between gap-3 p-3"
									>
										<div className="min-w-0">
											<div className="font-medium truncate">{s.song_title}</div>
											<div className="text-xs text-gray-500 truncate">
												{s.artist_name}
											</div>
										</div>
										<div className="text-xs text-gray-400 shrink-0 text-right">
											{s.appearances}/{s.total_shows} shows
											<div className="text-gray-500">
												{(s.rarity * 100).toFixed(0)}%
											</div>
										</div>
									</li>
								))}
							</ul>
						</section>
					)}

					<section className="flex flex-col gap-3">
						<h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
							Your shows
						</h2>
						{attended.length === 0 ? (
							<p className="text-gray-400 text-sm">
								Save shows from the{' '}
								<Link href="/shows" className="underline">
									setlists page
								</Link>{' '}
								to start tracking.
							</p>
						) : (
							<ul className="flex flex-col gap-2">
								{attended.map((show) => (
									<li key={show.user_show_id}>
										<ShowCard show={show} />
									</li>
								))}
							</ul>
						)}
					</section>
				</div>
			</div>
		</div>
	);
}

function Stat({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col">
			<span className="text-3xl font-bold">{value}</span>
			<span className="text-xs uppercase tracking-wide text-gray-400">
				{label}
			</span>
		</div>
	);
}
