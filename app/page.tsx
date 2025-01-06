import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '../components/header';
import TourDates from '../components/tour-dates';
import Hero from '@/components/hero';
// import { Input } from '@/components/ui/input';
// import Gallery from '../components/gallery';

export default function Home() {
	return (
		<div className="min-h-screen bg-black text-white">
			<Header />

			{/* Hero Section */}
			<Hero />

			{/* <section className="relative h-screen flex items-center justify-center">
				<Image
					src="/placeholder.svg?height=1080&width=1920"
					alt="Band on stage"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50" />
				<div className="relative z-10 text-center">
					<h1 className="text-6xl font-bold mb-4">The Rock Legends</h1>
					<p className="text-xl mb-8">Experience the sound of a generation</p>
					<Button size="lg" asChild>
						<Link href="#latest-release">Listen Now</Link>
					</Button>
				</div>
			</section> */}

			{/* Latest Release Section */}
			<section id="latest-release" className="py-20 bg-gray-900">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-8 text-center">
						Latest Release
					</h2>
					<div className="flex flex-col md:flex-row items-center justify-center gap-8">
						<Image
							src=""
							alt="Album cover"
							width={300}
							height={300}
							className="rounded-lg shadow-lg"
						/>
						<div>
							<h3 className="text-2xl font-semibold mb-2">
								Echoes of Eternity
							</h3>
							<p className="mb-4">
								Our newest album, featuring 12 tracks of pure rock energy.
							</p>
							<Button asChild>
								<Link href="#" target="_blank" rel="noopener noreferrer">
									Stream Now
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Tour Dates Section */}
			<TourDates />

			{/* Gallery Section */}
			{/* <Gallery /> */}

			{/* Newsletter Signup Section */}
			{/* <section className="py-20 bg-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-8 text-center">
						Join Our Mailing List
					</h2>
					<form className="max-w-md mx-auto flex gap-4">
						<Input
							type="email"
							placeholder="Enter your email"
							className="flex-grow"
						/>
						<Button type="submit">Subscribe</Button>
					</form>
				</div>
			</section> */}

			{/* Footer */}
			<footer className="bg-black py-8">
				<div className="container mx-auto px-4 text-center">
					<p>&copy; {new Date().getFullYear()} Mr. Please Entertainment</p>
				</div>
			</footer>
		</div>
	);
}
