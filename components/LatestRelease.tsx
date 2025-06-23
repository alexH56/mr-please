'use client';

import useWaveAnimation from '@/lib/hooks/useWaveAnimation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LatestRelease() {
	useWaveAnimation({
		canvasId: 'release-waves',
		wave1Color: 'rgba(255,215,0,0.8)',
		wave2Color: 'rgba(245,205,0,0.7)',
	});

	return (
		<section id="latest-release">
			<canvas id="release-waves" className="bg-[#6133B8]" />
			<div className="bg-[#F5D226]">
				<div className="container mx-auto px-4 py-12">
					<h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
						Latest Release
					</h2>
					<div className="flex flex-col md:flex-row items-center justify-center gap-8">
						<Image
							src="/images/pleasant_tense.jpg"
							alt="Album cover"
							width={300}
							height={300}
							className="rounded-lg shadow-lg"
						/>
						<div className="text-gray-800 text-center md:text-left">
							<h3 className="text-2xl font-semibold mb-4">Pleasant Tense</h3>
							<div className="flex flex-col gap-4 mb-6">
								<p>
									Pleasant Tense is a labor of love meant to take listeners on a
									genre-defying journey down a rabbit hole of self discovery,
									longing to escape, and ultimately finding contentment in the
									present moment, our natural world, and those we choose to
									share it with.
								</p>
							</div>
							<Button
								asChild
								className="bg-[#6133B8] text-white hover:bg-[#6133B8]/90"
							>
								<Link
									href="https://open.spotify.com/album/6b5aJPyRPjcbAu1zJiOuwT?si=ivNJET7gR2CqA488VYVHnA"
									target="_blank"
									rel="noopener noreferrer"
								>
									Listen Now
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
