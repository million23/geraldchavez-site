import { Button, Heading, Text } from "@radix-ui/themes";
import { SiGmail, SiLinkedin, SiTwitter } from "react-icons/si";

import Biography from "@/components/Biography";
import TechStack from "@/components/TechStack";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Head>
				<title>Gerald Chavez</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<div className="flex flex-col mt-40 lg:mt-56 gap-5 lg:gap-2">
				<Heading
					size="9"
					className="flex flex-col lg:flex-row cursor-default select-none"
				>
					Hi! I'm
					<motion.span
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
						className="lg:ml-2 text-transparent bg-clip-text bg-[url(https://products.ls.graphics/mesh-gradients/images/05.-Flax.jpg)]"
					>
						Gerald Chavez
					</motion.span>
				</Heading>
				<Text size="5">
					Front-end developer and UI/UX designer based in the Philippines.
				</Text>
				<Text size="5">
					I'm currently working at{" "}
					<Link
						className="underline underline-offset-4"
						href="https://www.otismanila.com/"
					>
						OTis Philippines Inc.
					</Link>{" "}
					as a Software Engineer.
				</Text>
			</div>

			<div className="mt-32">
				<Heading size="8" className="cursor-default select-none">
					Tech Stack
				</Heading>
				<Text>Sidenote: I'm a massive fanboi of Vercel's products :D</Text>
				<TechStack />
			</div>

			<div className="mt-32">
				<Heading size="8" className="cursor-default select-none">
					Short Biography
				</Heading>
				<Text>
					Please bear with me, I'm not good at writing stuff about myself. This
					is my background when I started my journey.
				</Text>

				{/* biography */}
				<Biography />
			</div>

			<div className="mt-32">
				<Heading size="8" className="cursor-default select-none">
					Contact Me
				</Heading>
				<Text>
					Are you interested in working with me? <br />
					Or do you just want to say hi? <br />
					Or do you want to ask me something? Feel free to contact me in these
					platforms.
				</Text>

				{/* contact me */}
				<div className="flex items-center mt-5 gap-2">
					<Link href="mailto:chavezgerald23@gmail.com" target="_">
						<Button>
							<SiGmail className="text-lg" />
							<span>Google Mail</span>
						</Button>
					</Link>
					<Link href="https://twitter.com/chavezMillion" target="_">
						<Button>
							<SiTwitter className="text-lg" />
							<span>Twitter</span>
						</Button>
					</Link>
					<Link href="https://www.linkedin.com/in/geraldchavez23/" target="_">
						<Button>
							<SiLinkedin className="text-lg" />
							<span>LinkedIn</span>
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
}
