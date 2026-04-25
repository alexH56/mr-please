import type { ReactNode } from 'react';

import { requireAdmin } from '@/lib/supabase/admin';

export default async function AdminLayout({
	children,
}: {
	children: ReactNode;
}) {
	await requireAdmin();

	return (
		<div className="min-h-screen pt-24 pb-12 bg-black text-gray-100">
			<div className="container mx-auto px-4">{children}</div>
		</div>
	);
}
