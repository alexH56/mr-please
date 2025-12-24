export default function Footer() {
	return (
		<footer className="bg-black text-white py-8 flex items-center justify-center">
			<div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center md:items-end px-4">
				<div className="flex flex-col gap-2 text-center md:text-left">
					<p>
						Photo by{' '}
						<a
							href="https://www.facebook.com/ojedaphotographer/"
							className="hover:opacity-80 underline hover:no-underline transition-all duration-200"
						>
							Ojeda Photography
						</a>
					</p>
					<p>
						Website by{' '}
						<a
							href="https://www.instagram.com/alex_hamilton56/"
							className="hover:opacity-80 underline hover:no-underline transition-all duration-200"
						>
							Alex Hamilton
						</a>
					</p>
				</div>
				<div className="flex flex-col gap-2 text-center md:text-left">
					<p>
						Contact{' '}
						<a
							href="mailto:booking@mrpleasemusic.com"
							className="hover:opacity-80 underline hover:no-underline transition-all duration-200"
						>
							booking@mrpleasemusic.com
						</a>
					</p>
					<p>&copy; {new Date().getFullYear()} Mr. Please Entertainment</p>
				</div>
			</div>
		</footer>
	);
}
