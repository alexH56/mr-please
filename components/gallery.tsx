'use client';

import useWaveAnimation from '@/lib/hooks/useWaveAnimation';
import Image from 'next/image';

export default function Gallery() {
	useWaveAnimation({
		canvasId: 'gallery-waves',
		wave1Color: 'rgba(156, 127, 207, 0.8)',
		wave2Color: 'rgba(137, 109, 184, 0.7)',
	});

	return (
		<section id="gallery">
			<canvas id="gallery-waves" className="bg-[#F5D226]" />
			<div className="bg-[#9C7FCF]">
				<div className="container mx-auto px-4 py-12">
					<h2 className="text-4xl font-bold mb-8 text-center text-white">
						Gallery
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="relative aspect-square">
							<Image
								src="/images/hero_img.jpg"
								alt="Mr. Please performing"
								fill
								className="object-cover rounded-lg"
							/>
						</div>
						<div className="relative aspect-square">
							<Image
								src="/images/please_head.png"
								alt="Mr. Please artwork"
								fill
								className="object-cover rounded-lg"
							/>
						</div>
						<div className="relative aspect-square">
							<Image
								src="/images/pleasant_tense.jpg"
								alt="Pleasant Tense album cover"
								fill
								className="object-cover rounded-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
