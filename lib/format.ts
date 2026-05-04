export function formatShowDate(
	date: string,
	variant: 'short' | 'long' = 'short',
) {
	const length = variant === 'long' ? 'long' : 'short';
	return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
		weekday: length,
		month: length,
		day: 'numeric',
		year: 'numeric',
	});
}

export function formatShowtime(showtime: string | null) {
	if (!showtime) return null;
	const [hStr, mStr] = showtime.split(':');
	const h = Number(hStr);
	const m = Number(mStr);
	if (Number.isNaN(h) || Number.isNaN(m)) return null;
	const d = new Date();
	d.setHours(h, m, 0, 0);
	return d.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
	});
}
