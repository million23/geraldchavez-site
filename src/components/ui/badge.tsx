import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "#/lib/utils";

const badgeVariants = cva(
	"inline-flex h-6 items-center rounded-full border px-2 text-label-12",
	{
		variants: {
			variant: {
				gray: "border-border bg-muted text-muted-foreground",
				blue: "border-transparent bg-[var(--ds-blue-700)] text-primary-foreground",
				red: "border-transparent bg-destructive text-destructive-foreground",
				amber: "border-transparent bg-[var(--ds-amber-700)] text-primary-foreground",
				green: "border-transparent bg-[var(--ds-green-700)] text-primary-foreground",
			},
		},
		defaultVariants: {
			variant: "gray",
		},
	},
);

interface BadgeProps
	extends HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}
