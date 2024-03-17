import { Button, buttonVariants } from "./ui/button";

import { SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const NavbarNew = () => {
	const { theme, setTheme } = useTheme();

	return (
		<nav className="fixed top-0 left-0 w-full flex items-center z-50 px-5 py-3 bg-background rounded-b-xl">
			<div className="w-full flex items-center gap-5">
				<Link href="/">Gerald Chavez</Link>
				<div className="flex-1 flex items-center justify-end gap-1 lg:gap-2">
					<Link
						href="/blog"
						className={buttonVariants({ variant: "ghost" })}
					>
						Blog
					</Link>
					<Link
						href="#footer"
						className={buttonVariants({ variant: "ghost" })}
					>
						Contact
					</Link>
					<Button
						onClick={() =>
							setTheme(theme === "dark" ? "light" : "dark")
						}
						size="icon"
						variant="ghost"
					>
						<SunMoonIcon />
					</Button>
				</div>
			</div>
		</nav>
	);
};

export default NavbarNew;
