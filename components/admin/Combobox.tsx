'use client';

import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type ComboboxItem = {
	id: string;
	label: string;
	sublabel?: string;
};

export type CreateFormProps = {
	initialQuery: string;
	onCreated: (item: ComboboxItem) => void;
	onCancel: () => void;
};

type CreateInline = {
	mode: 'inline';
	renderCreateForm: (props: CreateFormProps) => React.ReactNode;
};
type CreateLink = {
	mode: 'link';
	/** Return a destination the user navigates to to create a new item. */
	href: (query: string) => string;
};

type Props = {
	value: ComboboxItem | null;
	onChange: (value: ComboboxItem | null) => void;
	placeholder: string;
	emptyText?: string;
	search: (query: string) => Promise<ComboboxItem[]>;
	createLabel: string;
	create: CreateInline | CreateLink;
	disabled?: boolean;
};

function useDebouncedAsync<T>(
	fn: () => Promise<T>,
	deps: React.DependencyList,
	delay = 150,
) {
	const [value, setValue] = React.useState<T | null>(null);
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		let cancelled = false;
		setLoading(true);
		const t = setTimeout(async () => {
			try {
				const v = await fn();
				if (!cancelled) setValue(v);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}, delay);
		return () => {
			cancelled = true;
			clearTimeout(t);
		};
		// biome-ignore lint/correctness/useExhaustiveDependencies: deps are forwarded by the caller
	}, deps);
	return { value, loading };
}

export function Combobox({
	value,
	onChange,
	placeholder,
	emptyText = 'No results.',
	search,
	createLabel,
	create,
	disabled,
}: Props) {
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');
	const [mode, setMode] = React.useState<'search' | 'create'>('search');

	const { value: searchResults, loading } = useDebouncedAsync(
		() => (open ? search(query) : Promise.resolve<ComboboxItem[]>([])),
		[query, open, search],
	);
	const items = searchResults ?? [];

	React.useEffect(() => {
		if (!open) {
			setQuery('');
			setMode('search');
		}
	}, [open]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={disabled}
					className="w-full justify-between font-normal"
				>
					<span className={cn(!value && 'text-muted-foreground')}>
						{value ? value.label : placeholder}
					</span>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-72 p-0">
				{mode === 'search' ? (
					<Command shouldFilter={false}>
						<CommandInput
							placeholder={placeholder}
							value={query}
							onValueChange={setQuery}
						/>
						<CommandList>
							{loading ? (
								<div className="py-6 text-center text-sm text-muted-foreground">
									Searching…
								</div>
							) : (
								<>
									<CommandEmpty>{emptyText}</CommandEmpty>
									{items.length > 0 && (
										<CommandGroup>
											{items.map((item) => (
												<CommandItem
													key={item.id}
													value={item.id}
													onSelect={() => {
														onChange(item);
														setOpen(false);
													}}
												>
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															value?.id === item.id
																? 'opacity-100'
																: 'opacity-0',
														)}
													/>
													<div className="flex flex-col">
														<span>{item.label}</span>
														{item.sublabel && (
															<span className="text-xs text-muted-foreground">
																{item.sublabel}
															</span>
														)}
													</div>
												</CommandItem>
											))}
										</CommandGroup>
									)}
								</>
							)}
						</CommandList>
						<CommandSeparator />
						<CommandGroup>
							{create.mode === 'inline' ? (
								<CommandItem
									value="__create__"
									onSelect={() => setMode('create')}
								>
									<Plus className="mr-2 h-4 w-4" />
									{createLabel}
									{query && (
										<span className="ml-1 font-medium">&ldquo;{query}&rdquo;</span>
									)}
								</CommandItem>
							) : (
								<CommandItem asChild value="__create__">
									<Link href={create.href(query)} onClick={() => setOpen(false)}>
										<Plus className="mr-2 h-4 w-4" />
										{createLabel}
										{query && (
											<span className="ml-1 font-medium">
												&ldquo;{query}&rdquo;
											</span>
										)}
									</Link>
								</CommandItem>
							)}
						</CommandGroup>
					</Command>
				) : create.mode === 'inline' ? (
					<div className="p-3">
						{create.renderCreateForm({
							initialQuery: query,
							onCreated: (item) => {
								onChange(item);
								setOpen(false);
							},
							onCancel: () => setMode('search'),
						})}
					</div>
				) : null}
			</PopoverContent>
		</Popover>
	);
}
