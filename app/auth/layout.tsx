export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="fixed inset-0 overflow-auto bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-900/50 dark:from-black dark:via-slate-950 dark:to-purple-950/30">
			<div className="min-h-full">{children}</div>
		</div>
	);
}
