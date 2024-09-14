import { Button, buttonVariants } from "./ui/button";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const NavbarNew = () => {
	const { theme, setTheme } = useTheme();

	return (
		<nav className="fixed top-0 left-0 w-full flex items-center z-50 px-5 py-3 rounded-b-xl">
			<div
				style={{
					mask: "linear-gradient(to bottom, black, black, transparent)",
					backdropFilter: "blur(8px)",
				}}
				className="absolute top-[-50px] left-0 w-full h-[calc(100%+50px)]  -z-10"
			/>

			<div className="w-full flex items-center gap-5">
				<Link href="/">
					<motion.h6
						animate={{
							backgroundPosition: [
								"0% 0%",
								"0% 100%",
								"100% 100%",
								"100% 0%",
							],
						}}
						transition={{
							repeat: Infinity,
							duration: 10,
							ease: "linear",
						}}
						style={{
							backgroundSize: "200% 200%",
						}}
						className={cn(
							"font-bold",
							"bg-[url('/image-gradient.png')] bg-no-repeat bg-clip-text text-transparent"
						)}
					>
						Gerald Chavez
					</motion.h6>
				</Link>
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
