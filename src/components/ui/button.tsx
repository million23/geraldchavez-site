import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-button-14 transition-[color,background-color,box-shadow,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:opacity-80",
				secondary:
					"border border-border bg-background text-foreground hover:bg-muted",
				tertiary: "bg-transparent text-foreground hover:bg-muted",
				error: "bg-destructive text-destructive-foreground hover:opacity-80",
				warning:
					"bg-[var(--ds-amber-700)] text-primary-foreground hover:opacity-80",
			},
			size: {
				tiny: "h-8 px-3",
				small: "h-10 px-4",
				medium: "h-12 px-4",
				large: "h-12 px-6 text-button-16",
				icon: "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "medium",
		},
	},
);

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<button
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
