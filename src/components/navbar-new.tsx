import { AnimatePresence, motion } from "framer-motion";
import { Button, buttonVariants } from "./ui/button";
import { MenuIcon, SunMoonIcon, XIcon } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTheme } from "next-themes";

const NavbarNew = () => {
	const { theme, setTheme } = useTheme();
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 w-full flex items-center z-50 px-5 py-3 rounded-b-xl">
			<div
				style={{
					mask: "linear-gradient(to bottom, black, black, transparent)",
					backdropFilter: "blur(8px)",
				}}
				className="absolute top-[-50px] left-0 w-full h-[calc(100%+50px)]  -z-10"
			/>

			<div className="w-full flex items-center justify-between gap-5">
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
				<div className="flex-1 md:flex items-center justify-end gap-1 lg:gap-2 hidden">
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
				<div className="md:hidden flex justify-center items-center fixed bottom-0 pb-5 w-full left-0">
					<Button
						onClick={() => setIsSheetOpen(!isSheetOpen)}
						size="icon"
					>
						<MenuIcon className="text-foreground" size={16} />
					</Button>

					<div
						style={{
							mask: "linear-gradient(to top, black, black, transparent)",
							backdropFilter: "blur(8px)",
						}}
						className="absolute bottom-[-50px] left-0 w-full h-[calc(100%+50px)]  -z-10"
					/>
				</div>
			</div>

			<AnimatePresence>
				{isSheetOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-end"
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{
								opacity: 1,
								scale: 1,
								transition: {
									duration: 0.2,
									ease: [0.16, 1, 0.3, 1],
									delay: 0.2,
								},
							}}
							exit={{
								scale: 0.8,
								transition: {
									duration: 0.2,
									ease: [0.7, 0, 0.84, 0],
								},
							}}
							className="w-full h-fit flex flex-col gap-2 origin-bottom items-center justify-end p-5 bg-gradient-to-t from-background to-transparent"
						>
							<Link
								onClick={() => setIsSheetOpen(false)}
								href="/blog"
								className={cn(
									buttonVariants({
										variant: "outline",
										size: "lg",
									}),
									"w-full"
								)}
							>
								Blog
							</Link>
							<Link
								href="#footer"
								onClick={() => setIsSheetOpen(false)}
								className={cn(
									buttonVariants({
										variant: "outline",
										size: "lg",
									}),
									"w-full"
								)}
							>
								Contact
							</Link>
							<Button
								onClick={() =>
									setTheme(
										theme === "dark" ? "light" : "dark"
									)
								}
								size="icon"
								variant="ghost"
							>
								<SunMoonIcon />
							</Button>

							<Button
								onClick={() => setIsSheetOpen(!isSheetOpen)}
								size="icon"
								className="mt-5"
								variant="default"
							>
								<XIcon />
							</Button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default NavbarNew;
