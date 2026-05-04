import Image from 'next/image';
import Link from 'next/link';

import { formatShowDate } from '@/lib/format';
import { mediaUrl } from '@/lib/supabase/storage';
import { cn } from '@/lib/utils';

type Props = {
	show: {
		id: string;
		date: string;
		image_path: string | null;
		venue_name: string;
		artist_name?: string | null;
		venue?: { city: string | null; state: string | null } | null;
	};
	size?: 'sm' | 'md';
	showArtist?: boolean;
};

export function ShowCard({ show, size = 'sm', showArtist = false }: Props) {
	const url = mediaUrl(show.image_path);
	const isMd = size === 'md';
	const imagePx = isMd ? 80 : 56;
	const location =
		show.venue?.city && show.venue?.state
			? `${show.venue.city}, ${show.venue.state}`
			: null;

	return (
		<Link
			href={`/shows/${show.id}`}
			className={cn(
				'flex rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors',
				isMd ? 'gap-4 p-4' : 'gap-3 p-3',
			)}
		>
			<div
				className={cn(
					'relative shrink-0 rounded-md overflow-hidden bg-white/5',
					isMd ? 'w-20 h-20' : 'w-14 h-14',
				)}
			>
				{url && (
					<Image
						src={url}
						alt=""
						fill
						sizes={`${imagePx}px`}
						className="object-cover"
					/>
				)}
			</div>
			<div className="flex flex-col justify-center min-w-0">
				<div className="text-xs uppercase tracking-wide text-gray-400">
					{formatShowDate(show.date)}
				</div>
				<div
					className={cn(
						'truncate',
						isMd ? 'text-lg font-semibold' : 'font-medium',
					)}
				>
					{show.venue_name}
				</div>
				{location && (
					<div
						className={cn(
							'truncate',
							isMd ? 'text-sm text-gray-400' : 'text-xs text-gray-500',
						)}
					>
						{location}
					</div>
				)}
				{showArtist && show.artist_name && (
					<div className="text-xs text-gray-500 truncate">
						{show.artist_name}
					</div>
				)}
			</div>
		</Link>
	);
}
