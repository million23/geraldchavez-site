import { SiGmail, SiLinkedin, SiTwitter } from "react-icons/si";

import Biography from "@/components/biography";
import { Button } from "@/components/ui/button";
import { FiArrowDown } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Page from "@/components/page-content";
import TechStack from "@/components/tech-stack";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<>
			<Page title="Welcome!" className="py-0">
				<div className="flex flex-col justify-center min-h-screen -mt-32 gap-1 relative">
					<div className="absolute w-full h-screen top-0 left-0 -z-10">
						<Image
							fill
							alt="Landing Image"
							src="/landing-bg.svg"
							className="w-full h-full object-cover"
						/>
					</div>

					<h1 className="flex flex-col lg:flex-row lg:gap-1 cursor-default select-none">
						Hi! I'm {}
						<motion.h1
							animate={{
								backgroundPosition: [
									"0% 0%",
									"100% 0%",
									"100% 100%",
									"0% 100%",
									"0% 0%",
								],
								transition: { duration: 20, repeat: Infinity },
							}}
							className="lg:ml-2 text-transparent bg-clip-text bg-[url(/name-bg.webp)]"
						>
							Gerald Chavez
						</motion.h1>
					</h1>
					<p>
						Front-end developer and UI/UX designer based in the Philippines.
					</p>
					<p>
						I'm currently working at{" "}
						<Link
							className="underline underline-offset-4"
							href="https://www.otismanila.com/"
						>
							OTis Philippines Inc.
						</Link>{" "}
						as a Software Engineer.
					</p>

					<div className="absolute bottom-5 flex justify-center w-full animate-bounce">
						<FiArrowDown />
					</div>
				</div>

				<div className="mt-10">
					<h3 className="cursor-default select-none">Tech Stack</h3>
					<p>Sidenote: I'm a massive fanboi of Vercel's products :D</p>
					<TechStack />
				</div>

				<div className="mt-32">
					<h3 className="cursor-default select-none">Short Biography</h3>
					<p className="mb-10">
						Please bear with me, I'm not good at writing stuff about myself.
						This is my background when I started my journey.
					</p>

					{/* biography */}
					<Biography />
				</div>

				<div className="mt-32">
					<h3 className="cursor-default select-none">Contact Me</h3>
					<p>
						Are you interested in working with me? <br />
						Or do you just want to say hi? <br />
						Or do you want to ask me something? Feel free to contact me in these
						platforms.
					</p>

					{/* contact me */}
					<div className="flex items-center mt-5 gap-2">
						<Link href="mailto:chavezgerald23@gmail.com" target="_">
							<Button variant="outline" className="gap-2">
								<SiGmail className="text-lg" />
								<span>Google Mail</span>
							</Button>
						</Link>
						<Link href="https://twitter.com/chavezMillion" target="_">
							<Button variant="outline" className="gap-2">
								<SiTwitter className="text-lg" />
								<span>Twitter</span>
							</Button>
						</Link>
						<Link href="https://www.linkedin.com/in/geraldchavez23/" target="_">
							<Button variant="outline" className="gap-2">
								<SiLinkedin className="text-lg" />
								<span>LinkedIn</span>
							</Button>
						</Link>
					</div>
				</div>
			</Page>
		</>
	);
}
