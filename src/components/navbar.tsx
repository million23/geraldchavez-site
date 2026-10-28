import { Link, useRouterState } from "@tanstack/react-router";
import { MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";

function useTheme() {
	const [theme, setThemeState] = useState<"light" | "dark">("dark");

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		if (stored === "light" || stored === "dark") {
			apply(stored);
		}
	}, []);

	function apply(next: "light" | "dark") {
		setThemeState(next);
		document.documentElement.classList.toggle("dark", next === "dark");
		localStorage.setItem("theme", next);
	}

	return { theme, setTheme: apply };
}

function NavLink({
	to,
	hash,
	children,
	onClick,
}: {
	to: "/blog" | "/";
	hash?: string;
	children: string;
	onClick?: () => void;
}) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const active = to === "/blog" ? pathname.startsWith("/blog") : false;

	return (
		<Link
			to={to}
			hash={hash}
			onClick={onClick}
			className={cn(
				"-mb-px inline-flex h-12 items-center border-b-2 px-4 text-label-14 no-underline transition-[color,border-color] duration-150 ease-out",
				active
					? "border-foreground text-foreground"
					: "border-transparent text-muted-foreground hover:text-foreground",
			)}
		>
			{children}
		</Link>
	);
}

export function Navbar() {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const reduceMotion = useReducedMotion();
	const nextTheme = theme === "dark" ? "light" : "dark";
	const duration = reduceMotion ? 0 : 0.15;

	return (
		<nav className="sticky top-0 z-50 border-b border-border bg-background">
			<div className="mx-auto flex h-12 w-full max-w-[1400px] items-center px-6">
				<Link
					to="/"
					className="shrink-0 text-label-14 font-medium text-foreground no-underline"
				>
					Gerald Chavez
				</Link>

				<div className="ml-8 hidden h-12 md:flex">
					<NavLink to="/blog">Blog</NavLink>
					<NavLink to="/" hash="footer">
						Contact
					</NavLink>
				</div>

				<div className="ml-auto hidden items-center md:flex">
					<Button
						onClick={() => setTheme(nextTheme)}
						size="icon"
						variant="tertiary"
						aria-label={
							theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
						}
					>
						{theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
					</Button>
				</div>
			</div>

			<div className="fixed right-6 bottom-6 z-50 flex flex-col items-end md:hidden">
				<AnimatePresence>
					{isOpen ? (
						<>
							<motion.button
								key="fab-scrim"
								type="button"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration, ease: "easeOut" }}
								className="fixed inset-0 z-40 bg-[#00000082] backdrop-blur-sm"
								aria-label="Close menu"
								onClick={() => setIsOpen(false)}
							/>
							<motion.div
								key="fab-menu"
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 8 }}
								transition={{ duration, ease: "easeOut" }}
								style={{ transformOrigin: "bottom right" }}
								className="relative z-50 mb-3 flex w-48 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-[0_0_0_1px_var(--ds-gray-alpha-400),0_1px_2px_#00000029]"
							>
								<Link
									to="/blog"
									onClick={() => setIsOpen(false)}
									className={cn(
										buttonVariants({ variant: "tertiary" }),
										"h-12 w-full justify-start rounded-none px-4 no-underline",
									)}
								>
									Blog
								</Link>
								<Link
									to="/"
									hash="footer"
									onClick={() => setIsOpen(false)}
									className={cn(
										buttonVariants({ variant: "tertiary" }),
										"h-12 w-full justify-start rounded-none px-4 no-underline",
									)}
								>
									Contact
								</Link>
								<button
									type="button"
									onClick={() => setTheme(nextTheme)}
									className={cn(
										buttonVariants({ variant: "tertiary" }),
										"h-12 w-full justify-start gap-2 rounded-none px-4",
									)}
								>
									{theme === "dark" ? (
										<SunIcon size={16} />
									) : (
										<MoonIcon size={16} />
									)}
									{theme === "dark" ? "Light Theme" : "Dark Theme"}
								</button>
							</motion.div>
						</>
					) : null}
				</AnimatePresence>

				<Button
					onClick={() => setIsOpen((open) => !open)}
					size="icon"
					variant="default"
					className="relative z-50 size-12 min-h-12 min-w-12 rounded-full"
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
				>
					{isOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
				</Button>
			</div>
		</nav>
	);
}
