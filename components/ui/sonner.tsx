'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

export function Toaster(props: ToasterProps) {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg',
					description: 'group-[.toast]:text-gray-400',
					actionButton: 'group-[.toast]:bg-white group-[.toast]:text-black',
					cancelButton:
						'group-[.toast]:bg-white/10 group-[.toast]:text-gray-300',
				},
			}}
			{...props}
		/>
	);
}
