'use client';

import useWaveAnimation from '@/lib/hooks/useWaveAnimation';

export default function TourDates() {
	useWaveAnimation({
		canvasId: 'tour-waves',
		wave1Color: 'rgba(30,135,215,0.8)',
		wave2Color: 'rgba(25,120,195,0.7)',
	});

	return (
		<section id="tour-dates" className="t">
			<canvas id="tour-waves" className="bg-[#F5D226]" />
			<div className="bg-[#2888D2] py-12 ">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold mb-8 text-center">
						Upcoming Shows
					</h1>
					<div className="space-y-4">
						<div
							id="seated-55fdf2c0"
							data-artist-id="fe1fd003-2d45-493e-af12-d463897baf04"
							data-css-version="3"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
