import {
	SiFigma,
	SiNextdotjs,
	SiNodedotjs,
	SiReact,
	SiSvelte,
	SiTailwindcss,
	SiVercel,
} from "react-icons/si";

import Link from "next/link";
import { Card } from "./ui/card";

interface TechStack {
	name: string;
	description: string;
	logo: React.ReactNode | string;
	url: string;
}

const techStack: TechStack[] = [
	{
		name: "Vercel",
		description:
			"Front-end cloud platform that enables developers to host their web apps that deploy instantly.",
		logo: <SiVercel />,
		url: "https://vercel.com/",
	},
	{
		name: "Next.js",
		description:
			"The ultimate React framework that enables developers to build web applications with ease.",
		logo: <SiNextdotjs />,
		url: "https://nextjs.org/",
	},
	{
		name: "React",
		description:
			"A JavaScript library for building user interfaces. Opinions included.",
		logo: <SiReact />,
		url: "https://react.dev/",
	},
	{
		name: "Svelte",
		description:
			"Also a JavaScript library for building user interfaces. But faster.",
		logo: <SiSvelte />,
		url: "https://react.dev/",
	},
	{
		name: "Tailwind CSS",
		description:
			"A utility-first CSS framework for rapidly building custom user interfaces.",
		logo: <SiTailwindcss />,
		url: "https://tailwindcss.com/",
	},
	{
		name: "TypeScript",
		description:
			"A superset of JavaScript that compiles to clean JavaScript output.",
		logo: "TS",
		url: "https://www.typescriptlang.org/",
	},
	{
		name: "Node.js",
		description:
			"An open-source, cross-platform, back-end JavaScript runtime environment.",
		logo: <SiNodedotjs />,
		url: "https://nodejs.org/",
	},
	{
		name: "Figma",
		description:
			"A vector graphics editor and prototyping tool which is primarily web-based.",
		logo: <SiFigma />,
		url: "https://www.figma.com/",
	},
];

const TechStack = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-2">
			{techStack.map((tech) => (
				<Link href={tech.url} target="_" key={tech.name}>
					<Card className="select-none hover:-translate-y-1 group transition-all cursor-pointer">
						<div className="flex items-center gap-3 px-5 py-3">
							<div className="w-16 h-16 text-2xl group-hover:text-primary transition-colors flex justify-center items-center border rounded-full">
								{tech.logo}
							</div>
							<div className="flex flex-col flex-1">
								<h5 className=" group-hover:text-primary transition-colors">
									{tech.name}
								</h5>
								<p>{tech.description}</p>
							</div>
						</div>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default TechStack;
