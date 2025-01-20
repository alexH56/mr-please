'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
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

	const styles = {
		link: 'hover:text-gray-300 transition-all duration-200',
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-black text-white bg-opacity-75">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center py-4">
					<div className="flex items-center gap-4">
						<div
							className={`relative w-10 aspect-square floating-head-transition ${
								isScrolledPast ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
							}`}
						>
							<Image
								src="/please_head.png"
								alt="Mr. Please"
								fill
								className="object-contain"
								priority
							/>
						</div>
						<Link href="/" className="text-2xl font-bold --font-montserrat">
							Mr. Please
						</Link>
					</div>
					<nav className="hidden md:flex space-x-4">
						<Link href="#latest-release" className={styles.link}>
							Music
						</Link>
						<Link href="#tour-dates" className={styles.link}>
							Tour
						</Link>

						<div className="flex space-x-4">
							<a
								href="https://facebook.com/mrpleasemusic"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.link}
							>
								<Facebook size={24} />
							</a>
							<a
								href="https://instagram.com/mrpleasemusic"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.link}
							>
								<Instagram size={24} />
							</a>
							<a
								href="https://www.youtube.com/@mrpleasemusic"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.link}
							>
								<Youtube size={24} />
							</a>
						</div>
						{/* <Link href="#gallery" className={styles.link}>
							Gallery
						</Link> */}
					</nav>
					<button
						type="button"
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>
			{isMenuOpen && (
				<nav className="md:hidden bg-black py-4">
					<div className="container mx-auto px-4 flex flex-col space-y-2">
						<Link
							href="#latest-release"
							className={styles.link}
							onClick={() => setIsMenuOpen(false)}
						>
							Music
						</Link>
						<Link
							href="#tour-dates"
							className={styles.link}
							onClick={() => setIsMenuOpen(false)}
						>
							Shows
						</Link>
						<Link
							href="https://mrplease.bandcamp.com/music"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.link}
							onClick={() => setIsMenuOpen(false)}
						>
							Live Recordings
						</Link>
						{/* <Link
							href="#gallery"
							className={styles.link}
							onClick={() => setIsMenuOpen(false)}
						>
							Gallery
						</Link> */}
					</div>
				</nav>
			)}
		</header>
	);
}
