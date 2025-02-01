import TourDates from "@/components/TourDates";
import Hero from "@/components/hero";
import About from "@/components/About";
import LatestRelease from "@/components/LatestRelease";
import Gallery from "@/components/Gallery";
// import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="bg-gray-100">
        <About />
      </section>

      {/* Latest Release Section */}
      <section id="latest-release" className="bg-gray-100">
        <LatestRelease />
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-gray-100">
        <Gallery />
      </section>

      {/* Tour Dates Section */}
      <section id="tour-dates" className="bg-gray-100">
        <TourDates />
      </section>

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
      <footer className="bg-black text-white py-8 flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center px-4">
          <p>
            Contact:{" "}
            <a
              href="mailto:booking@mrpleasemusic.com"
              className="hover:opacity-80 hover:underline transition-all duration-200"
            >
              booking@mrpleasemusic.com
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} Mr. Please Entertainment</p>
        </div>
      </footer>
    </div>
  );
}
