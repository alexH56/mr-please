'use client';

import { Clock } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
	id?: string;
	value: string;
	onChange: (hhmm: string) => void;
	placeholder?: string;
};

type Period = 'AM' | 'PM';

const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);
const PERIODS: Period[] = ['AM', 'PM'];

type Parsed = { h12: number; m: number; period: Period };

function parse12(hhmm: string): Parsed | null {
	if (!hhmm) return null;
	const [hStr, mStr] = hhmm.split(':');
	const h = Number(hStr);
	const m = Number(mStr);
	if (Number.isNaN(h) || Number.isNaN(m)) return null;
	const period: Period = h >= 12 ? 'PM' : 'AM';
	const h12 = h % 12 === 0 ? 12 : h % 12;
	return { h12, m, period };
}

function compose(h12: number, period: Period, m: number): string {
	const h24 =
		period === 'AM' ? (h12 === 12 ? 0 : h12) : h12 === 12 ? 12 : h12 + 12;
	return `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function format12(parsed: Parsed): string {
	return `${parsed.h12}:${String(parsed.m).padStart(2, '0')} ${parsed.period}`;
}

export function TimePicker({
	id,
	value,
	onChange,
	placeholder = 'Pick a time',
}: Props) {
	const [open, setOpen] = React.useState(false);
	const parsed = React.useMemo(() => parse12(value), [value]);

	const setHour = (h: number) =>
		onChange(compose(h, parsed?.period ?? 'AM', parsed?.m ?? 0));
	const setMinute = (m: number) =>
		onChange(compose(parsed?.h12 ?? 12, parsed?.period ?? 'AM', m));
	const setPeriod = (p: Period) =>
		onChange(compose(parsed?.h12 ?? 12, p, parsed?.m ?? 0));

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					id={id}
					type="button"
					variant="outline"
					className={cn(
						'w-full justify-start font-normal',
						!value && 'text-muted-foreground',
					)}
				>
					<Clock className="mr-2 h-4 w-4" />
					{parsed ? format12(parsed) : placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<div className="flex h-60">
					<TimeColumn
						label="Hour"
						items={HOURS_12}
						selected={parsed?.h12 ?? null}
						format={(h) => String(h)}
						onSelect={setHour}
					/>
					<div className="w-px bg-border" />
					<TimeColumn
						label="Min"
						items={MINUTES}
						selected={parsed?.m ?? null}
						format={(m) => String(m).padStart(2, '0')}
						onSelect={setMinute}
					/>
					<div className="w-px bg-border" />
					<TimeColumn
						label=""
						items={PERIODS}
						selected={parsed?.period ?? null}
						format={(p) => p}
						onSelect={setPeriod}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function TimeColumn<T extends string | number>({
	label,
	items,
	selected,
	format,
	onSelect,
}: {
	label: string;
	items: readonly T[];
	selected: T | null;
	format: (v: T) => string;
	onSelect: (v: T) => void;
}) {
	return (
		<div className="flex flex-col">
			<div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground border-b min-h-[33px]">
				{label}
			</div>
			<div className="flex-1 overflow-y-auto p-1 w-16">
				{items.map((v) => {
					const isSelected = selected === v;
					return (
						<button
							key={String(v)}
							type="button"
							onClick={() => onSelect(v)}
							className={cn(
								'w-full rounded-sm px-2 py-1 text-sm text-center hover:bg-accent hover:text-accent-foreground',
								isSelected && 'bg-accent text-accent-foreground font-medium',
							)}
						>
							{format(v)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
