'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
	const router = useRouter();

	const logout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		toast.success('Signed out');
		router.push('/');
		router.refresh();
	};

	return (
		<Button onClick={logout} size="sm" variant="outline">
			Log out
		</Button>
	);
}
