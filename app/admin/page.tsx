import type { ComboboxItem } from '@/components/admin/Combobox';
import { NewShowForm } from '@/components/admin/NewShowForm';
import { requireAdmin } from '@/lib/supabase/admin';

const DEFAULT_ARTIST_NAME = 'Mr. Please';

export default async function NewShowPage() {
	const { supabase } = await requireAdmin();

	let initialArtist: ComboboxItem | null = null;
	const { data } = await supabase
		.from('artist')
		.select('id, name')
		.eq('name', DEFAULT_ARTIST_NAME)
		.maybeSingle();
	if (data) {
		initialArtist = { id: data.id, label: data.name };
	}

	return <NewShowForm initialArtist={initialArtist} />;
}
