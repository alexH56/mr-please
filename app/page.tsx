import About from '@/components/About';
import Hero from '@/components/Hero';
import LatestRelease from '@/components/LatestRelease';
import TourDates from '@/components/TourDates';
// import Gallery from "@/components/Gallery";
// import { Input } from '@/components/ui/input';

export default function Home() {
	return (
		<div className="min-h-screen text-gray-100 bg-black">
			<Hero />

			<About />
			<LatestRelease />
			<TourDates />
			{/* <Gallery /> */}
		</div>
	);
}

//  Newsletter Signup Section
//    <section className="py-20 bg-gray-800">
// 				<div className="container mx-auto px-4">
// 					<h2 className="text-4xl font-bold mb-8 text-center">
// 						Join Our Mailing List
// 					</h2>
// 					<form className="max-w-md mx-auto flex gap-4">
// 						<Input
// 							type="email"
// 							placeholder="Enter your email"
// 							className="flex-grow"
// 						/>
// 						<Button type="submit">Subscribe</Button>
// 					</form>
// 				</div>
// 			</section>
