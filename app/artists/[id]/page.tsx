import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ShowCard } from '@/components/ShowCard';
import { createClient } from '@/lib/supabase/server';
import { mediaUrl } from '@/lib/supabase/storage';

export const dynamic = 'force-dynamic';

export default async function ArtistPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	const [artistRes, showsRes] = await Promise.all([
		supabase
			.from('artist')
			.select('id, name, image_path')
			.eq('id', id)
			.maybeSingle(),
		supabase
			.from('show')
			.select('id, date, image_path, venue_name, venue:venue_id(city, state)')
			.eq('artist_id', id)
			.order('date', { ascending: false }),
	]);

	if (artistRes.error || !artistRes.data) {
		notFound();
	}

	const artist = artistRes.data;
	const shows = showsRes.data ?? [];
	const heroUrl = mediaUrl(artist.image_path);

	return (
		<div className="min-h-screen pt-24 pb-16 bg-black text-gray-100">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto flex flex-col gap-8">
					<header className="flex items-center gap-5">
						<div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white/5 shrink-0">
							{heroUrl && (
								<Image
									src={heroUrl}
									alt={artist.name}
									fill
									sizes="128px"
									className="object-cover"
								/>
							)}
						</div>
						<div>
							<h1 className="text-3xl md:text-4xl font-bold">{artist.name}</h1>
							<p className="text-sm text-gray-400">
								{shows.length} show{shows.length === 1 ? '' : 's'} on file
							</p>
						</div>
					</header>

					<section className="flex flex-col gap-3">
						<h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
							Shows
						</h2>
						{shows.length === 0 ? (
							<p className="text-gray-400">No shows yet.</p>
						) : (
							<ul className="flex flex-col gap-2">
								{shows.map((show) => (
									<li key={show.id}>
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
