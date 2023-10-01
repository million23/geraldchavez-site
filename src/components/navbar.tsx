import { FiMoon, FiSun } from "react-icons/fi";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

const Navbar = () => {
	const { theme, setTheme } = useTheme();

	return (
		<nav className="sticky top-0 flex justify-between items-center py-7 bg-background z-40">
			<Link href="/">
				<Image src={"/logo.png"} width={25} height={25} alt="Gerald Chavez" />
			</Link>
			<div className="flex items-center gap-2">
				<Link href="/blog">
					<Button variant="outline">Blog</Button>
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
	);
};

export default Navbar;
