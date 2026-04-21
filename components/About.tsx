'use client';

import useWaveAnimation from '@/lib/hooks/useWaveAnimation';

export default function About() {
	useWaveAnimation({
		canvasId: 'about-waves-bottom',
		wave1Color: 'rgba(30,135,215,0.8)',
		wave2Color: 'rgba(25,120,195,0.7)',
	});

	return (
		<section id="about">
			<canvas id="about-waves-bottom" className="bg-[#F5D226]" />
			<div className="bg-[#2888D2] py-12">
				<div className="container mx-auto px-4">
					<div className="flex flex-col gap-4 max-w-4xl mx-auto text-[#F8F2FF]">
						<h1 className="sr-only">About</h1>
						<i className="text-xl mb-2">
							There's a duality at the heart of Mr. Please: a band driven by a
							shared love for both the power of a great song and the magic of
							live improvisation.
						</i>
						<p>
							Drawing on a wide range of influences, the group weaves a sonic
							tapestry that defies easy categorization.
						</p>
						<p>
							Blending their funk and indie rock foundation with sounds from
							across the world and back again to those of their native Kentucky,
							their innovative songwriting and dynamic performance have earned
							them spots at Summer Camp and Backwoods Music Festivals, along
							with opening slots for acts like SunSquabi and Dizgo.
						</p>
						<p>
							<b>In the studio,</b> the five-piece tackles subjects from the
							serious to the sexy to the absurd (and sometimes all at once). Not
							content to limit themselves in style or genre, the group's only
							goal is to craft songs with infectious melodies, memorable lyrics,
							and grooves that make you want to 🕺 <i>dance</i> 💃.
						</p>
						<p>
							<b>On the stage,</b> this no-holds-barred approach rings twice as
							true. Minor-key electronica over a bluegrass beat? Jazzed-up
							psychedelia on a 90's hip-hop cover? All on the table. The band
							treats their live set as a playground where they expand on their
							songs with jams that evolve every time they play, exchanging
							energy with the audience in a way that leaves no two shows the
							same.
						</p>
						<p>
							In early 2020, the group was formed by a twist of fate. Guitarist
							& vocalist <b>Max Voorhees</b> was living abroad in Asia and,
							while on a visit home to Louisville, met with friends{' '}
							<b>Ryan Chadwick</b> (drums/vocals) and <b>Alex Hamilton</b>{' '}
							(guitar/vocals) for a jam session. Days later, all flights back
							were canceled due to the Covid-19 pandemic, and what was supposed
							to be a one-off jam quickly became a serious project. After the
							world opened back up and they began playing shows, the gang soon
							added <b>Nico Extra</b> (keyboards/vocals) to round out their
							lineup.
						</p>
						<p>
							In the years since, the band has built a dedicated fanbase as they
							continue to push boundaries and explore new sonic territory. On
							the back of their debut album <i>Pleasant Tense,</i> Mr. Please is
							hitting the road to build their following—and community—one jam at
							a time.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
