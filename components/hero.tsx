'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
	const [isScrolledPast, setIsScrolledPast] = useState(false);

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
		<section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
			{/* Background Image */}
			<Image
				src="/hero_img.jpg"
				alt="Background scenery"
				fill
				className="object-cover"
				priority
			/>

			{/* Semi-transparent Overlay */}
			<div className="absolute inset-0 bg-black/10" />

			{/* Overlay Image */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div
					className={`relative w-1/4 md:w-1/5 lg:w-1/6 aspect-square transition-all duration-500 ${
						isScrolledPast ? 'opacity-0' : ''
					}`}
				>
					<Image
						src="/please_head.png"
						alt="Overlay image"
						fill
						className="object-contain hvr-hang"
						priority
					/>
				</div>
			</div>
		</section>
	);
}
