import { getSupabaseEnv } from '@/lib/supabase/env';

export const MEDIA_BUCKET = 'media';

export function mediaUrl(path: string | null | undefined): string | null {
	if (!path) return null;
	const { url } = getSupabaseEnv();
	return `${url}/storage/v1/object/public/${MEDIA_BUCKET}/${path}`;
}
