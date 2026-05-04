'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
import { type AuthState, loginAction } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';

const initial: AuthState = { error: null };

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const requestedNext = useSearchParams().get('next') ?? '';
	// Only honor relative redirects to keep us off open-redirect territory.
	const next = requestedNext.startsWith('/') ? requestedNext : '';
	const [state, action, pending] = useActionState(loginAction, initial);

	useEffect(() => {
		if (state.error) toast.error(state.error);
	}, [state]);

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={action}>
						<input type="hidden" name="next" value={next} />
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
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<Link
										href="/auth/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</Link>
								</div>
								<Input id="password" name="password" type="password" required />
							</div>
							<Button type="submit" className="w-full" disabled={pending}>
								{pending ? 'Logging in...' : 'Login'}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link
								href="/auth/sign-up"
								className="underline underline-offset-4"
							>
								Sign up
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
