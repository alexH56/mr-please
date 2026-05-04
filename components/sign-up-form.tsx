'use client';

import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type AuthState, signUpAction } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';

const initial: AuthState = { error: null };

export function SignUpForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [state, action, pending] = useActionState(signUpAction, initial);

	useEffect(() => {
		if (state.error) toast.error(state.error);
	}, [state]);

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Sign up</CardTitle>
					<CardDescription>Create a new account</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={action}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="johnny@mrpleasemusic.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="display-name">Display name (optional)</Label>
								<Input
									id="display-name"
									name="displayName"
									type="text"
									placeholder="What should we call you?"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input id="password" name="password" type="password" required />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="repeat-password">Repeat Password</Label>
								<Input
									id="repeat-password"
									name="repeatPassword"
									type="password"
									required
								/>
							</div>
							<Button type="submit" className="w-full" disabled={pending}>
								{pending ? 'Creating an account...' : 'Sign up'}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{' '}
							<Link href="/auth/login" className="underline underline-offset-4">
								Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
