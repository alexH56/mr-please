'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { toggleSavedShow } from '@/lib/actions/user-show';

export function SaveShowButton({
	showId,
	initialSaved,
	loggedIn,
}: {
	showId: string;
	initialSaved: boolean;
	loggedIn: boolean;
}) {
	const [saved, setSaved] = useState(initialSaved);
	const [pending, startTransition] = useTransition();

	if (!loggedIn) {
		return (
			<Button asChild variant="outline" size="sm" className="w-fit">
				<Link href={`/auth/login?next=/shows/${showId}`}>
					<Bookmark className="h-4 w-4 mr-1" />
					Sign in to save
				</Link>
			</Button>
		);
	}

	const onClick = () => {
		const next = !saved;
		setSaved(next);
		startTransition(async () => {
			try {
				const res = await toggleSavedShow(showId);
				setSaved(res.saved);
				toast.success(
					res.saved ? 'Saved to your shows' : 'Removed from your shows',
				);
			} catch (e) {
				setSaved(!next);
				toast.error(e instanceof Error ? e.message : "Couldn't save show");
			}
		});
	};

	return (
		<Button
			type="button"
			variant={saved ? 'default' : 'outline'}
			size="sm"
			disabled={pending}
			onClick={onClick}
			className="w-fit"
		>
			{saved ? (
				<BookmarkCheck className="h-4 w-4 mr-1" />
			) : (
				<Bookmark className="h-4 w-4 mr-1" />
			)}
			{saved ? 'Saved' : 'I was there'}
		</Button>
	);
}
