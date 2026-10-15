import { AnimatePresence, motion } from "framer-motion";

import Page from "@/components/page-content";
import { techStack } from "@/components/tech-stack";
import { Skeleton } from "@/components/ui/skeleton";
import { Portfolio } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NewLandingPage = () => {
	const fetchPortfolio = async () => {
		const res = await fetch("/api/portfolios");
		const data = (await res.json()) as Portfolio[];

		return data;
	};

	const _portfolio = useQuery({
		queryKey: ["portfolio.all"],
		queryFn: fetchPortfolio,
		staleTime: 1000 * 60 * 60, // 1 hour
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		cacheTime: 1000 * 60 * 60, // 1 hour
	});

	return (
		<>
			<Page
				title="Welcome!"
				className=" py-10 min-h-screen flex flex-col gap-10 relative"
			>
				{/* hero */}
				<AnimatePresence mode="wait">
					<motion.div
						initial={{ opacity: 0, translateY: 20 }}
						animate={{ opacity: 1, translateY: 0 }}
						transition={{
							duration: 0.5,
							ease: "easeOut",
							delay: 0.5,
						}}
						className="py-10 h-screen flex flex-col justify-end gap-5"
					>
						{/* <MousePointerClickIcon size={80} strokeWidth={1.2} /> */}
						<div className="relative h-16 w-16">
							<Image
								src="/logo.png"
								alt="logo"
								fill
								className="object-contain"
							/>
						</div>
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
					</motion.div>
				</AnimatePresence>

				{/* projects */}
				<div className="py-10 flex flex-col gap-5" id="projects">
					<h1>Projects</h1>

					<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 lg:p-10">
						{_portfolio.isLoading &&
							Array(3)
								.fill(0)
								.map((_, i) => (
									<Skeleton
										key={`portfoliocard_loader_${i}`}
										className="h-[360px]"
									/>
								))}
						{_portfolio.isSuccess &&
							_portfolio.data.map((portfolio) => (
								<div className="rounded-xl border-4 border-border overflow-hidden col-span-full md:col-span-1">
									<Link href={`/portfolio/${portfolio.slug}`}>
										<div className="relative w-full h-64">
											<Image
												src={portfolio.mainImage.url}
												alt={portfolio.mainImage.alt}
												fill
												className="w-full h-60 object-cover object-center"
											/>
										</div>
									</Link>
									<div className="p-5 space-y-2">
										<Link
											href={`/portfolio/${portfolio.slug}`}
										>
											<h5>{portfolio.title}</h5>
										</Link>
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
								Graduated in University of Caloocan City and
								currently working as a Software Engineer at Otis
								Philippines Inc. My projects so far came from
								different industries such as real estate,
								e-commerce, and more (I cannot disclose the
								rest, but my portfolios here are public projects
								or projects from my thesis).
							</p>
						</div>
					</div>
				</div>
			</Page>
		</>
	);
};

export default NewLandingPage;
