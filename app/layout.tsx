import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Script from 'next/script';

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
});

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-poppins',
});

export const metadata: Metadata = {
	title: 'Mr. Please',
	description:
		'Mr. Please is a groovy rock band from Louisville, KY with a knack for both catchy hooks and deep improvisation.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Script src="https://widget.seated.com/app.js" />
			<body
				className={`${montserrat.variable} ${poppins.variable} antialiased bg-black dark`}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}
