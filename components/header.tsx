'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

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

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-75">
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
						<Link href="/" className="text-2xl font-bold">
							Mr. Please
						</Link>
					</div>
					<nav className="hidden md:flex space-x-4">
						<Link href="#latest-release" className="hover:text-gray-300">
							Music
						</Link>
						<Link href="#tour-dates" className="hover:text-gray-300">
							Tour
						</Link>
						<Link href="#gallery" className="hover:text-gray-300">
							Gallery
						</Link>
						<Button asChild>
							<Link href="#" target="_blank" rel="noopener noreferrer">
								Buy Tickets
							</Link>
						</Button>
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
							className="hover:text-gray-300"
							onClick={() => setIsMenuOpen(false)}
						>
							Music
						</Link>
						<Link
							href="#tour-dates"
							className="hover:text-gray-300"
							onClick={() => setIsMenuOpen(false)}
						>
							Tour
						</Link>
						<Link
							href="#gallery"
							className="hover:text-gray-300"
							onClick={() => setIsMenuOpen(false)}
						>
							Gallery
						</Link>
						<Button asChild>
							<Link href="#" target="_blank" rel="noopener noreferrer">
								Buy Tickets
							</Link>
						</Button>
					</div>
				</nav>
			)}
		</header>
	);
}
