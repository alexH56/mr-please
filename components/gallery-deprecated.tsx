import Image from 'next/image';

export default function Gallery() {
	return (
		<div className="container mx-auto px-4">
			<h2 className="text-4xl font-bold mb-8 text-center">Gallery</h2>
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
	);
}
