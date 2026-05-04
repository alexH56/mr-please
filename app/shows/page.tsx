import { ShowCard } from '@/components/ShowCard';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function ShowsPage() {
	const supabase = await createClient();
	const { data: shows, error } = await supabase
		.from('show')
		.select(
			'id, date, showtime, image_path, artist_id, artist_name, venue_id, venue_name, venue:venue_id(city, state)',
		)
		.order('date', { ascending: false });

	return (
		<div className="min-h-screen pt-24 pb-16 bg-black text-gray-100">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl font-bold mb-8">Setlists</h1>

					{error && (
						<p className="text-red-500 text-sm">Failed to load shows.</p>
					)}

					{shows && shows.length === 0 && (
						<p className="text-gray-400">No shows yet.</p>
					)}

					<ul className="flex flex-col gap-3">
						{shows?.map((show) => (
							<li key={show.id}>
								<ShowCard show={show} size="md" showArtist />
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
