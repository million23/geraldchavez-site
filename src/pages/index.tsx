import { ArrowRight, CircleIcon, MousePointerClickIcon } from "lucide-react";

import Page from "@/components/page-content";
import { techStack } from "@/components/tech-stack";
import { Portfolio } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

const NewLandingPage = () => {
	const fetchPortfolio = async () => {
		const res = await fetch("/api/portfolios");
		const data = await res.json();

		return data as { portfolios: Portfolio[] };
	};

	const _portfolio = useQuery({
		queryKey: ["portfolio.all"],
		queryFn: fetchPortfolio,
		staleTime: 1000 * 60 * 60, // 1 hour
	});

	const markdownComponents: Partial<Components> = {
		p: ({ children, node, className }) => {
			return <p className={`${className} text-base`}>{children}</p>;
		},
		a: ({ children, node, className, href }) => {
			return (
				<Link
					className={`${className} text-base underline text-primary`}
					href={href as string}
					target="_blank"
					rel="noopener noreferrer"
				>
					{children}
				</Link>
			);
		},
		b: ({ children, node, className }) => {
			return (
				<span className={`${className} font-semibold`}>{children}</span>
			);
		},
	};

	return (
		<>
			{/* loading screen */}
			{/* <AnimatePresence>
					{_portfolio.isLoading && <LandingLoading />}
				</AnimatePresence> */}

			<Page
				title="Welcome!"
				className=" py-10 min-h-screen flex flex-col gap-10 relative"
			>
				{/* hero */}
				<div className="py-10 h-screen flex flex-col justify-end gap-5">
					<MousePointerClickIcon size={80} strokeWidth={1.2} />
					<p className="w-full max-w-xl text-3xl">
						Philippine based frontend developer with a niche for
						creating functional and modern web applications.
					</p>

					<div className="mt-10 grid grid-cols-4 lg:p-7 gap-5">
						<div className="col-span-full lg:col-span-2">
							<p>Current work</p>
							<p className="font-medium">
								Software Engineer - OTis Philippines Inc.
							</p>
						</div>
						<div className="col-span-full md:col-span-1 ">
							<p>Based in</p>
							<p className="font-medium">Philippines</p>
						</div>
						<div className="col-span-full md:col-span-1">
							<p>Keep in touch</p>
							<Link
								className="font-medium"
								href="mailto:chavezgerald23@gmail.com"
							>
								chavezgerald23@gmail.com
							</Link>
						</div>
					</div>
				</div>

				{/* projects */}
				<div className="py-10 flex flex-col gap-5">
					<h1>Projects</h1>

					<div className="grid grid-cols-3 gap-5 lg:p-10">
						{_portfolio.isSuccess &&
							_portfolio.data.portfolios.map((portfolio) => (
								<div className="rounded-xl border-4 border-border overflow-hidden col-span-full md:col-span-1">
									<div className="bg-border flex items-center justify-start p-2 gap-1 mt-[-3px]">
										<CircleIcon
											size={12}
											className="fill-red-500 stroke-red-200/50"
										/>
										<CircleIcon
											size={12}
											className="fill-yellow-500 stroke-yellow-200/50"
										/>
										<CircleIcon
											size={12}
											className="fill-green-500 stroke-green-200/50"
										/>
									</div>
									<Link href={`/portfolio/${portfolio.slug}`}>
										<div className="relative w-full h-64">
											<Image
												src={portfolio.cardImage.url}
												alt={
													portfolio.cardImage.fileName
												}
												fill
												className="w-full h-60 object-cover object-center"
											/>
										</div>
									</Link>
									<div className="p-5 space-y-2">
										<Link
											href={`/portfolio/${portfolio.slug}`}
										>
											<h3>{portfolio.productName}</h3>
										</Link>
										<ReactMarkdown
											components={markdownComponents}
											className="line-clamp-2"
										>
											{portfolio.projectDescription}
										</ReactMarkdown>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* about me */}
				<div className="py-10 flex flex-col gap-5">
					<h1>About me</h1>
					<div className="flex flex-col divide-y-2 divide-border">
						<div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5">
							<div className="flex items-center h-max gap-2">
								<ArrowRight size={16} />
								<p>Overview</p>
							</div>
							<p>
								A frontend developer based in the Philippines. I
								have a passion for creating modern and
								functional web applications. My main goal is to
								create a seamless user experience and a clean
								and efficient interface. I am also a fan of
								minimalism and simplicity.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5">
							<div className="flex items-center h-max gap-2">
								<ArrowRight size={16} />
								<p>Tech Stack</p>
							</div>
							<div className="grid grid-cols-2 gap-2">
								{techStack.map((tech) => (
									<Link
										className="hover:underline underline-offset-4"
										href={tech.url}
									>
										{tech.name}
									</Link>
								))}
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5">
							<div className="flex items-center h-max gap-2">
								<ArrowRight size={16} />
								<p>Short Biography</p>
							</div>
							<p>
								Fresh graduate from the University of Caloocan
								City with a degree in Bachelor of Science in
								Computer Science. I am currently working as a
								Software Engineer at Otis Philippines Inc. My
								projects so far came from different industries
								such as real estate, e-commerce, and more (I
								cannot disclose the rest, but my portfolios here
								are public projects or projects from my thesis).
							</p>
						</div>
					</div>
				</div>
			</Page>
		</>
	);
};

export default NewLandingPage;
