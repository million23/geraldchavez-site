import { FiMoon, FiSun } from "react-icons/fi";

import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Toggle } from "./ui/toggle";
import { useTheme } from "next-themes";

const Navbar = () => {
	const { theme, setTheme } = useTheme();

	return (
		<>
			<nav className="sticky top-0 flex justify-between items-center py-7 bg-background z-40">
				<Link href="/" className="flex gap-2 items-center group">
					<Image src={"/logo.png"} width={25} height={25} alt="Gerald Chavez" />
					<h6 className="opacity-0 group-hover:opacity-100 -translate-x-[5px] group-hover:translate-x-0 transition-all hidden md:block">
						Gerald Chavez
					</h6>
				</Link>
				<div className="flex items-center gap-2">
					<Link href="/portfolio">
						<Button variant="ghost">Portfolio</Button>
					</Link>
					<Link href="/blog">
						<Button variant="ghost">Blog</Button>
					</Link>
					<Toggle
						pressed={theme === "dark"}
						onPressedChange={(e) => {
							setTheme(e ? "dark" : "light");
						}}
						className="text-md"
					>
						{theme ? theme === "dark" ? <FiSun /> : <FiMoon /> : <FiSun />}
					</Toggle>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
