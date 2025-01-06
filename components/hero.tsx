import React from 'react';

import Image from 'next/image';

export default function Hero() {
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
			<div className="absolute inset-0 bg-black/10 " />

			{/* Overlay Image */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="relative w-1/4 md:w-1/5 lg:w-1/6 aspect-square">
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
