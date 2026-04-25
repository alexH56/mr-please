const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
	throw new Error('NEXT_PUBLIC_SUPABASE_URL must be set');
}
const supabaseHost = new URL(supabaseUrl).hostname;

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ['image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: supabaseHost,
				pathname: '/storage/v1/object/public/**',
			},
		],
	},
};

export default nextConfig;
