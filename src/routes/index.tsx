import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GradientASCII } from "#/components/gradient-ascii";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "#/components/ui/carousel";

interface PortfolioCard {
	_id: string;
	title: string;
	slug: string;
	mainImage: {
		url: string;
		alt: string | null;
	};
}

const techStack = [
	{ name: "Vercel", url: "https://vercel.com/" },
	{ name: "TanStack Ecosystem", url: "https://tanstack.com/" },
	{ name: "React", url: "https://react.dev/" },
	{ name: "Svelte", url: "https://svelte.dev/" },
	{ name: "Tailwind CSS", url: "https://tailwindcss.com/" },
	{ name: "TypeScript", url: "https://www.typescriptlang.org/" },
	{ name: "Bun", url: "https://bun.com/" },
	{ name: "Figma", url: "https://www.figma.com/" },
];

async function fetchPortfolios() {
	const projectId =
		import.meta.env.VITE_SANITY_PROJECT_ID ??
		(typeof process !== "undefined"
			? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
			: undefined) ??
		"2l4otb3p";
	const dataset = "development";
	const query = encodeURIComponent(`*[_type == "portfolio"]{
		_id,
		title,
		"slug": slug.current,
		mainImage { alt, "url": asset->url }
	}`);
	const res = await fetch(
		`https://${projectId}.api.sanity.io/v2026-01-08/data/query/${dataset}?query=${query}&perspective=published`,
	);

	if (!res.ok) {
		throw new Error("Failed to fetch portfolios");
	}

	const json = (await res.json()) as { result: PortfolioCard[] };
	return json.result ?? [];
}

const portfoliosQueryOptions = queryOptions({
	queryKey: ["portfolio.all"],
	queryFn: fetchPortfolios,
	staleTime: 1000 * 60 * 60,
	gcTime: 1000 * 60 * 60,
	retry: 2,
	refetchOnWindowFocus: false,
});

export const Route = createFileRoute("/")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(portfoliosQueryOptions).catch(() => []),
	component: NewLandingPage,
});

function HeroField() {
	const [lightMode, setLightMode] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		const sync = () => setLightMode(!root.classList.contains("dark"));
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return (
		<div
			aria-hidden="true"
			className="absolute inset-0 z-0 h-full w-full opacity-40"
		>
			<GradientASCII
				colors={
					lightMode
						? ["#EAEAEA", "#C9C9C9", "#171717"]
						: ["#2E2E2E", "#454545", "#EDEDED"]
				}
				shape="horizon"
				characters=" =+xX0S8#@"
				cellSize={18}
				density={0.8}
				glow={0}
				speed={0}
				flow={0}
				grain={0.08}
				intro={false}
				clickEffect="none"
				lightMode={lightMode}
				fontFamily="Geist Mono, SF Mono, Monaco, Consolas, monospace"
			/>
		</div>
	);
}

function ProjectCarousel({
	items,
	pending,
}: {
	items: PortfolioCard[];
	pending: boolean;
}) {
	if (!pending && items.length === 0) {
		return (
			<div className="flex flex-col gap-6">
				<h1 className="text-heading-32">Projects</h1>
				<p className="text-copy-14">
					No projects here yet. They show up when a piece of work is ready to
					share.
				</p>
			</div>
		);
	}

	const slides = pending
		? Array.from({ length: 4 }, (_, i) => ({
				_id: `portfoliocard_loader_${i + 1}`,
			}))
		: items;

	return (
		<Carousel
			opts={{
				align: "start",
				slidesToScroll: 1,
				breakpoints: {
					"(min-width: 768px)": { slidesToScroll: 2 },
				},
			}}
			className="flex flex-col gap-6"
			aria-label="Projects"
		>
			<div className="flex items-center justify-between gap-6">
				<h1 className="text-heading-32">Projects</h1>
				<div className="relative flex gap-2">
					<CarouselPrevious className="static translate-y-0" />
					<CarouselNext className="static translate-y-0" />
				</div>
			</div>
			<CarouselContent>
				{slides.map((slide) => (
					<CarouselItem key={slide._id} className="basis-full md:basis-1/2">
						{"slug" in slide ? (
							<Link
								to="/portfolio/$slug"
								params={{ slug: slide.slug }}
								className="group flex flex-col text-foreground no-underline"
							>
								<div className="aspect-[16/9] overflow-hidden rounded-lg border border-border transition-[border-color] duration-150 ease-out group-hover:border-[var(--ds-gray-500)]">
									<img
										src={slide.mainImage.url}
										alt={slide.mainImage.alt ?? slide.title}
										className="size-full object-cover object-center"
									/>
								</div>
								<div className="mt-3 flex items-baseline justify-between gap-3">
									<h2 className="text-heading-16">{slide.title}</h2>
									<p className="shrink-0 text-label-13-mono text-muted-foreground">
										{slide.slug}
									</p>
								</div>
							</Link>
						) : (
							<div>
								<div className="aspect-[16/9] animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
								<div className="mt-3 h-5 w-32 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
							</div>
						)}
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}

function NewLandingPage() {
	const portfolios = useQuery(portfoliosQueryOptions);

	return (
		<div className="relative flex flex-col">
			<section className="relative min-h-[calc(100svh-3rem)]">
				<HeroField />
				<div className="pointer-events-none relative z-10 flex min-h-[calc(100svh-3rem)] flex-col justify-end gap-6 py-10">
					<div className="relative size-16">
						<img
							src="/logo.png"
							alt="Gerald Chavez"
							className="size-full object-contain"
						/>
					</div>
					<p className="w-full max-w-[22ch] text-heading-40 text-pretty">
						I build interfaces that feel obvious the second you touch them.
					</p>

					<div className="mt-10 grid grid-cols-4 gap-6">
						<div className="col-span-full lg:col-span-2">
							<p className="text-label-13 text-muted-foreground">Current work</p>
							<p className="text-copy-14">
								Software Engineer - OTis Philippines Inc.
							</p>
							<p className="text-copy-14">
								Technology Instructor - College of Innovation and Integrated
								Technology
							</p>
						</div>
						<div className="col-span-full md:col-span-1">
							<p className="text-label-13 text-muted-foreground">Based in</p>
							<p className="text-copy-14">Philippines</p>
						</div>
						<div className="col-span-full md:col-span-1">
							<p className="text-label-13 text-muted-foreground">Keep in touch</p>
							<a
								className="pointer-events-auto text-copy-14"
								href="mailto:chavezgerald23@gmail.com"
							>
								chavezgerald23@gmail.com
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="flex flex-col gap-6 py-16" id="projects">
				<ProjectCarousel
					items={portfolios.data ?? []}
					pending={portfolios.isPending}
				/>
			</section>

			<section className="flex flex-col gap-6 py-16">
				<h2 className="text-heading-32">About me</h2>
				<div className="flex flex-col divide-y divide-border">
					<div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
						<p className="text-label-14 text-muted-foreground">Overview</p>
						<p className="max-w-[65ch] text-copy-16">
							I'm an interface and experience engineer based in the Philippines.
							I ship products people can operate without a tour. Function first,
							then the quiet parts that make it feel finished.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
						<p className="text-label-14 text-muted-foreground">Tech stack</p>
						<div className="grid grid-cols-2 gap-2">
							{techStack.map((tech) => (
								<a key={tech.name} href={tech.url}>
									{tech.name}
								</a>
							))}
						</div>
					</div>
					<div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
						<p className="text-label-14 text-muted-foreground">
							Short biography
						</p>
						<p className="max-w-[65ch] text-copy-16">
							I write front-end and UI at OTis Philippines Inc., where I have
							been full-time for three years. At CIIT I teach web development
							part-time, usually React and the rest of the stack I use at work.
							I have been taking freelance work since 2021.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
