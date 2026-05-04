'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import {
	FacebookIcon,
	InstagramIcon,
	YoutubeIcon,
} from '@/components/SocialIcons';
import { navLinkStyle } from '@/lib/styles';

const navLinks = [
	{ href: '#latest-release', label: 'Music' },
	{ href: '#tour-dates', label: 'Shows' },
	{ href: '/shows', label: 'Setlists' },
	{ href: '#about', label: 'About' },
] as const;

const mobileExtraLinks = [
	{
		href: 'https://mrplease.bandcamp.com/music',
		label: 'Live Recordings',
		external: true,
	},
] as const;

const socialLinks = [
	{
		href: 'https://facebook.com/mrpleasemusic',
		icon: FacebookIcon,
		label: 'Facebook',
	},
	{
		href: 'https://instagram.com/mrpleasemusic',
		icon: InstagramIcon,
		label: 'Instagram',
	},
	{
		href: 'https://www.youtube.com/@mrpleasemusic',
		icon: YoutubeIcon,
		label: 'YouTube',
	},
] as const;

export default function Header({ authSlot }: { authSlot?: ReactNode }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolledPast, setIsScrolledPast] = useState(false);
	const pathname = usePathname();
	const isHomepage = pathname === '/';
	const showLogo = !isHomepage || isScrolledPast;

	useEffect(() => {
		if (!isHomepage) return;

		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const heroHeight = window.innerHeight * 0.8; // 80vh
			setIsScrolledPast(scrollPosition > heroHeight / 2);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isHomepage]);

	const closeMenu = () => setIsMenuOpen(false);

	const renderSocials = (onClick?: () => void) =>
		socialLinks.map(({ href, icon: Icon, label }) => (
			<a
				key={href}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={navLinkStyle}
				aria-label={label}
				onClick={onClick}
			>
				<Icon size={24} />
			</a>
		));

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-black text-white bg-opacity-75">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center py-4">
					<div className="flex items-center gap-4">
						<div
							className={`relative w-10 aspect-square floating-head-transition ${
								showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
							}`}
						>
							<Image
								src="/images/please_head.png"
								alt="Mr. Please Logo"
								fill
								className="object-contain"
								priority
							/>
						</div>
						<Link href="/" className="text-2xl font-bold --font-montserrat">
							Mr. Please
						</Link>
					</div>
					<nav className="hidden md:flex items-center space-x-4">
						{navLinks.map(({ href, label }) => (
							<Link key={href} href={href} className={navLinkStyle}>
								{label}
							</Link>
						))}
						<div className="flex space-x-4">{renderSocials()}</div>
						{authSlot && <div className="ml-2">{authSlot}</div>}
					</nav>
					<button
						type="button"
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>
			{isMenuOpen && (
				<nav className="md:hidden bg-black py-4">
					<div className="container mx-auto px-4 flex flex-col items-end space-y-2">
						{navLinks.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={navLinkStyle}
								onClick={closeMenu}
							>
								{label}
							</Link>
						))}
						{mobileExtraLinks.map(({ href, label, external }) => (
							<Link
								key={href}
								href={href}
								target={external ? '_blank' : undefined}
								rel={external ? 'noopener noreferrer' : undefined}
								className={navLinkStyle}
								onClick={closeMenu}
							>
								{label}
							</Link>
						))}
						<div className="flex space-x-4 pt-4">
							{renderSocials(closeMenu)}
						</div>
						{authSlot && <div className="pt-4">{authSlot}</div>}
					</div>
				</nav>
			)}
		</header>
	);
}
