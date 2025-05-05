'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useWaveAnimation from '@/lib/hooks/useWaveAnimation';

export default function Hero() {
	const [isScrolledPast, setIsScrolledPast] = useState(false);
	useWaveAnimation({
		canvasId: 'about-waves',
		wave1Color: 'rgba(120,65,200,0.8)',
		wave2Color: 'rgba(85,45,175,0.7)',
	});

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const heroHeight = window.innerHeight * 0.8; // 80vh
			setIsScrolledPast(scrollPosition > heroHeight / 2);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="relative">
			<section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
				{/* Background Image */}
				<Image
					src="/images/hero.jpg"
					alt="Background scenery"
					fill
					sizes="100vw"
					placeholder="blur"
					blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmVyc2lvbj0iMS4xIj4KICA8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMzMzMiLz4KPC9zdmc+"
					className="object-cover"
					priority
				/>

				{/* Semi-transparent Overlay */}
				<div className="absolute inset-0 bg-black/10" />

				{/* Overlay Image */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div
						className={`relative w-1/4 md:w-1/5 lg:w-1/6 aspect-square transition-all duration-500 ${isScrolledPast ? 'opacity-0' : ''}`}
					>
						<Image
							src="/images/please_head.png"
							alt="Overlay image"
							fill
							sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 16vw"
							className="object-contain hvr-hang"
							priority
						/>
					</div>
				</div>

				{/* Wave Canvas */}
				<canvas
					id="about-waves"
					className="absolute bottom-0 left-0 right-0 w-full"
				/>
			</section>
		</div>
	);
}
