import Link from 'next/link';

import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import { isAdminUser } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function AuthNav() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return (
			<div className="flex items-center gap-2">
				<Button asChild size="sm" variant="outline">
					<Link href="/auth/login">Sign in</Link>
				</Button>
				<Button asChild size="sm">
					<Link href="/auth/sign-up">Sign up</Link>
				</Button>
			</div>
		);
	}

	const admin = isAdminUser(user);

	return (
		<div className="flex items-center gap-3 text-sm">
			{admin && (
				<Link
					href="/admin"
					className="hover:text-gray-300 transition-all duration-200"
				>
					Admin
				</Link>
			)}
			<LogoutButton />
		</div>
	);
}
