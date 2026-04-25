'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
	id?: string;
	value: string;
	onChange: (iso: string) => void;
	placeholder?: string;
};

function toDate(iso: string): Date | undefined {
	if (!iso) return undefined;
	const [y, m, d] = iso.split('-').map(Number);
	if (!y || !m || !d) return undefined;
	return new Date(y, m - 1, d);
}

function toIso(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
}

export function DatePicker({
	id,
	value,
	onChange,
	placeholder = 'Select date',
}: Props) {
	const [open, setOpen] = React.useState(false);
	const selected = toDate(value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					id={id}
					type="button"
					variant="outline"
					className={cn(
						'w-full justify-start font-normal',
						!selected && 'text-muted-foreground',
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{selected ? selected.toLocaleDateString() : placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto overflow-hidden p-0" align="start">
				<Calendar
					mode="single"
					selected={selected}
					defaultMonth={selected}
					captionLayout="dropdown"
					onSelect={(date) => {
						if (date) {
							onChange(toIso(date));
							setOpen(false);
						}
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
