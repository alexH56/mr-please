'use client';

import { ImageIcon, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

type Props = {
	value: string | null;
	onChange: (path: string | null) => void;
	pathPrefix: string;
	label?: string;
	maxSizeMB?: number;
	accept?: string;
};

const BUCKET = 'media';

export function ImageUpload({
	value,
	onChange,
	pathPrefix,
	label = 'Upload image',
	maxSizeMB = 8,
	accept = 'image/*',
}: Props) {
	const [busy, setBusy] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);

	// Files uploaded under shows/pending/ (or artists/pending/) remain in
	// Storage even if the user abandons the form — a cleanup job for
	// unreferenced objects older than ~24h is a follow-up.
	const publicUrl = React.useMemo(
		() =>
			value
				? createClient().storage.from(BUCKET).getPublicUrl(value).data.publicUrl
				: null,
		[value],
	);

	const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setError(null);

		if (file.size > maxSizeMB * 1024 * 1024) {
			setError(`File is too large (max ${maxSizeMB} MB).`);
			return;
		}
		if (!file.type.startsWith('image/')) {
			setError('Only image files are allowed.');
			return;
		}

		setBusy(true);
		try {
			const supabase = createClient();
			const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
			const path = `${pathPrefix.replace(/\/$/, '')}/${crypto.randomUUID()}.${ext}`;
			const { error: uploadErr } = await supabase.storage
				.from(BUCKET)
				.upload(path, file, { upsert: false, contentType: file.type });
			if (uploadErr) throw uploadErr;
			onChange(path);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Upload failed');
		} finally {
			setBusy(false);
			if (inputRef.current) inputRef.current.value = '';
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<input
				ref={inputRef}
				type="file"
				accept={accept}
				onChange={onPick}
				className="hidden"
			/>
			{value && publicUrl ? (
				<div className="relative w-40 h-40 rounded-md overflow-hidden border">
					<Image
						src={publicUrl}
						alt="Uploaded"
						fill
						sizes="160px"
						className="object-cover"
					/>
					<button
						type="button"
						onClick={() => onChange(null)}
						className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
						aria-label="Remove image"
					>
						<X className="h-4 w-4" />
					</button>
				</div>
			) : (
				<Button
					type="button"
					variant="outline"
					disabled={busy}
					onClick={() => inputRef.current?.click()}
					className="w-40 h-40 flex-col gap-2"
				>
					{busy ? (
						<Loader2 className="h-5 w-5 animate-spin" />
					) : (
						<ImageIcon className="h-5 w-5" />
					)}
					<span className="text-xs text-muted-foreground">{label}</span>
				</Button>
			)}
			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
