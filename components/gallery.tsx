import Image from 'next/image';

const images = [
	{
		id: 'stage',
		src: '/placeholder.svg?height=400&width=600',
		alt: 'Band performing on stage',
	},
	{
		id: 'guitarist',
		src: '/placeholder.svg?height=400&width=600',
		alt: 'Close-up of guitarist',
	},
	{
		id: 'crowd',
		src: '/placeholder.svg?height=400&width=600',
		alt: 'Crowd at a concert',
	},
	{
		id: 'backstage',
		src: '/placeholder.svg?height=400&width=600',
		alt: 'Band backstage',
	},
];

export default function Gallery() {
	return (
		<section id="gallery" className="py-20 bg-gray-900">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold mb-8 text-center">Gallery</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{images.map((image) => (
						<div key={image.id} className="relative aspect-video">
							<Image
								src={image.src}
								alt={image.alt}
								fill
								className="object-cover rounded-lg"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
