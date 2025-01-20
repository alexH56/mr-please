import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TourDates from "@/components/TourDates";
import Hero from "@/components/hero";
// import { Input } from '@/components/ui/input';
// import Gallery from '../components/gallery';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">About</h2>
          <div className="max-w-3xl mx-auto text-lg">
            <p className="mb-4">
              Mr. Please is a genre-defying musical experience from Louisville,
              Kentucky. Drawing on a wide range of influences, from the
              bluegrass of their native Kentucky to psychedelia, funk, and indie
              rock, Mr. Please offers something for everyone with a sound
              uniquely their own.
            </p>
            <p>
              The band&apos;s dynamic live performances and innovative
              songwriting have earned them a dedicated following, as they
              continue to push boundaries and explore new musical territories
              while staying true to their roots.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Release Section */}

      <section id="latest-release" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Latest Release
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Image
              src="/pleasant_tense.jpg"
              alt="Album cover"
              width={300}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Pleasant Tense</h3>
              <div className="flex flex-col gap-4 mb-4">
                <p>
                  Pleasant Tense is a labor of love meant to take listeners on a
                  genre-defying journey down a rabbit hole of self discovery,
                  longing to escape, and ultimately finding contentment in the
                  present moment, our natural world, and those we choose to
                  share it with.
                </p>
                {/* <p>
									Drawing on a wide range of genres, from the bluegrass of their
									native Kentucky to the likes of psychedelia, funk, and indie
									rock, Mr. Please offers something for everyone with a sound
									uniquely their own.
								</p> */}
              </div>
              <Button asChild>
                <Link
                  href="https://open.spotify.com/album/6b5aJPyRPjcbAu1zJiOuwT?si=ivNJET7gR2CqA488VYVHnA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stream Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative aspect-square">
              <Image
                src="/hero_img.jpg"
                alt="Mr. Please performing"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative aspect-square">
              <Image
                src="/please_head.png"
                alt="Mr. Please artwork"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative aspect-square">
              <Image
                src="/pleasant_tense.jpg"
                alt="Pleasant Tense album cover"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tour Dates Section */}
      <section className="bg-white">
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
            booking:{" "}
            <a
              href="mailto:mrpleaseofficial@gmail.com"
              className="hover:opacity-80 hover:underline transition-all duration-200"
            >
              mrpleaseofficial@gmail.com
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} Mr. Please Entertainment</p>
        </div>
      </footer>
    </div>
  );
}
