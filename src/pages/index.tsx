import { SiInstagram, SiLinkedin, SiTwitter } from "react-icons/si";

import Biography from "@/components/biography";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import Page from "@/components/page-content";
import TechStack from "@/components/tech-stack";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<>
			<Head>
				<title>Gerald Chavez</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<Page title="Welcome!" className="py-0">
				<div className="flex flex-col mt-40 lg:mt-40 gap-1">
					<h1 className="flex flex-col lg:flex-row cursor-default select-none">
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
							className="lg:ml-2 text-transparent bg-clip-text bg-[url(/name-bg.webp)]"
						>
							Gerald Chavez
						</motion.span>
					</h1>
					<h6>
						Front-end developer and UI/UX designer based in the
						Philippines.
					</h6>
					<h6>
						I'm currently working at{" "}
						<Link
							className="underline underline-offset-4"
							href="https://www.otismanila.com/"
						>
							OTis Philippines Inc.
						</Link>{" "}
						as a Software Engineer.
					</h6>
				</div>

				<div className="mt-32">
					<h3 className="cursor-default select-none">Tech Stack</h3>
					<p>
						Sidenote: I'm a massive fanboi of Vercel's products :D
					</p>
					<TechStack />
				</div>

				<div className="mt-32">
					<h3 className="cursor-default select-none">
						Short Biography
					</h3>
					<p className="mb-10">
						Stay with me, I know this may cringe some people. But,
						here is my short background about me and my journey.
					</p>

					{/* biography */}
					<Biography />
				</div>

				<div className="mt-32">
					<h3 className="cursor-default select-none">Contact Me</h3>
					<p>
						Are you interested in working with me? <br />
						Or do you just want to say hi? <br />
						Or do you want to ask me something? Feel free to contact
						me in these platforms.
					</p>

					{/* contact me */}
					<div className="flex items-center mt-5 gap-2">
						<Link
							href="https://www.instagram.com/iam.geraldchavez/"
							target="_"
						>
							<Button variant="outline" className="gap-2">
								<SiInstagram className="text-lg" />
								<span>Instagram</span>
							</Button>
						</Link>
						<Link
							href="https://twitter.com/chavezMillion"
							target="_"
						>
							<Button variant="outline" className="gap-2">
								<SiTwitter className="text-lg" />
								<span>Twitter</span>
							</Button>
						</Link>
						<Link
							href="https://www.linkedin.com/in/geraldchavez23/"
							target="_"
						>
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
