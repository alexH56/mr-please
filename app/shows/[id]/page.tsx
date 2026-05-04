import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SaveShowButton } from '@/components/SaveShowButton';
import { type SetlistSet, SetlistView } from '@/components/SetlistView';
import { formatShowDate, formatShowtime } from '@/lib/format';
import { createClient } from '@/lib/supabase/server';
import { mediaUrl } from '@/lib/supabase/storage';

export const dynamic = 'force-dynamic';

export default async function ShowPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	const [showRes, setsRes, photosRes, userRes] = await Promise.all([
		supabase
			.from('show')
			.select(
				'id, date, showtime, notes, image_path, artist_id, artist_name, venue_id, venue_name, venue:venue_id(name, city, state, address1)',
			)
			.eq('id', id)
			.maybeSingle(),
		supabase
			.from('set')
			.select(
				'id, set_number, is_encore, song_set(id, order, song_id, song_title, transition, note:note(id, marker, content))',
			)
			.eq('show_id', id),
		supabase
			.from('show_photo')
			.select('id, path, caption, created_at')
			.eq('show_id', id)
			.order('created_at', { ascending: true }),
		supabase.auth.getUser(),
	]);

	if (showRes.error || !showRes.data) {
		notFound();
	}

	const show = showRes.data;
	const sets: SetlistSet[] = (setsRes.data ?? [])
		.map((s) => ({
			id: s.id,
			set_number: s.set_number,
			is_encore: s.is_encore,
			songs: (s.song_set ?? [])
				.slice()
				.sort((a, b) => a.order - b.order)
				.map((ss) => ({
					id: ss.id,
					song_id: ss.song_id,
					song_title: ss.song_title,
					transition: ss.transition,
					order: ss.order,
					note: ss.note ?? null,
				})),
		}))
		.sort((a, b) => {
			if (a.is_encore !== b.is_encore) return a.is_encore ? 1 : -1;
			return a.set_number - b.set_number;
		});

	const photos = photosRes.data ?? [];
	const user = userRes.data.user;

	let initialSaved = false;
	if (user) {
		const { data } = await supabase
			.from('user_show')
			.select('id')
			.eq('user_id', user.id)
			.eq('show_id', id)
			.maybeSingle();
		initialSaved = !!data;
	}

	const coverUrl = mediaUrl(show.image_path);
	const time = formatShowtime(show.showtime);
	const venue = show.venue;

	return (
		<div className="min-h-screen pt-24 pb-16 bg-black text-gray-100">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto flex flex-col gap-8">
					<Link
						href="/shows"
						className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 -mb-4"
					>
						<ChevronLeft className="h-4 w-4" />
						All shows
					</Link>

					<header className="flex flex-col gap-4">
						{coverUrl && (
							<div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-white/5">
								<Image
									src={coverUrl}
									alt={`${show.venue_name} — ${show.date}`}
									fill
									sizes="(min-width: 768px) 768px, 100vw"
									className="object-cover"
									priority
								/>
							</div>
						)}

						<div className="flex flex-col gap-1">
							<div className="text-sm uppercase tracking-wide text-gray-400">
								{formatShowDate(show.date, 'long')}
								{time && <span className="ml-2 text-gray-500">{time}</span>}
							</div>
							<h1 className="text-3xl md:text-4xl font-bold leading-tight">
								{show.venue_name}
							</h1>
							{venue && (
								<p className="text-gray-400">
									{venue.city}, {venue.state}
								</p>
							)}
							{show.artist_name && (
								<Link
									href={`/artists/${show.artist_id}`}
									className="text-sm text-gray-300 hover:text-white underline-offset-4 hover:underline w-fit"
								>
									{show.artist_name}
								</Link>
							)}
						</div>

						<SaveShowButton
							showId={show.id}
							initialSaved={initialSaved}
							loggedIn={!!user}
						/>

						{show.notes && (
							<p className="text-sm text-gray-300 italic border-l-2 border-white/20 pl-3">
								{show.notes}
							</p>
						)}
					</header>

					<section className="p-5 rounded-lg border border-white/10 bg-white/5">
						<SetlistView sets={sets} />
					</section>

					{photos.length > 0 && (
						<section className="flex flex-col gap-3">
							<h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
								Photos
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
								{photos.map((photo) => {
									const url = mediaUrl(photo.path);
									if (!url) return null;
									return (
										<figure
											key={photo.id}
											className="relative aspect-square rounded-md overflow-hidden bg-white/5"
										>
											<Image
												src={url}
												alt={photo.caption ?? ''}
												fill
												sizes="(min-width: 768px) 33vw, 50vw"
												className="object-cover"
											/>
										</figure>
									);
								})}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}
