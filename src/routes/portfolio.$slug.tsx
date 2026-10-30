import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
	getBodySections,
	PortableBody,
} from "#/components/portable-body";
import { formatPostDate } from "#/lib/blog";
import { portfolioQueryOptions } from "#/lib/portfolio";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/portfolio/$slug")({
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData?.title
					? `${loaderData.title} | Gerald Chavez`
					: "Projects | Gerald Chavez",
			},
		],
	}),
	loader: async ({ context, params }) => {
		const project = await context.queryClient.ensureQueryData(
			portfolioQueryOptions(params.slug),
		);
		if (!project) {
			throw notFound();
		}
		return project;
	},
	notFoundComponent: () => (
		<div className="py-10">
			<p className="text-copy-14">That project is not here.</p>
		</div>
	),
	component: PortfolioPage,
});

function PortfolioPage() {
	const project = Route.useLoaderData();
	const sections = useMemo(
		() => getBodySections(project.body ?? []),
		[project.body],
	);
	const [activeId, setActiveId] = useState(sections[0]?.id);

	useEffect(() => {
		if (sections.length === 0) return;
		const nodes = sections
			.map((section) => document.getElementById(section.id))
			.filter((node): node is HTMLElement => node !== null);
		if (nodes.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				const id = visible[0]?.target.id;
				if (id) setActiveId(id);
			},
			{ rootMargin: "-96px 0px -55% 0px", threshold: 0 },
		);
		for (const node of nodes) observer.observe(node);
		return () => observer.disconnect();
	}, [sections]);

	return (
		<article className="grid grid-cols-1 gap-10 pt-12 pb-10 md:grid-cols-12">
			<aside className="flex flex-col gap-6 md:col-span-3 md:sticky md:top-24 md:self-start">
				<Link
					to="/"
					hash="projects"
					className="inline-flex w-fit items-center gap-2 text-label-14"
				>
					<ArrowLeft size={16} />
					Back to Projects
				</Link>
				<div className="flex flex-col gap-6">
					{project.publishedAt ? (
						<div>
							<p className="text-label-13 text-muted-foreground">Published</p>
							<p className="text-label-14-mono">
								{formatPostDate(project.publishedAt)}
							</p>
						</div>
					) : null}
					<div>
						<p className="text-label-13 text-muted-foreground">Slug</p>
						<p className="text-label-14-mono">{project.slug}</p>
					</div>
					{sections.length > 0 ? (
						<nav aria-label="Sections" className="flex flex-col gap-3">
							<p className="text-label-13 text-muted-foreground">Sections</p>
							<ul className="flex flex-col gap-2">
								{sections.map((section) => (
									<li key={section.id} className="min-w-0">
										<a
											href={`#${section.id}`}
											className={cn(
												"flex h-9 min-w-0 items-center rounded-md px-3 text-label-14 no-underline transition-[color,background-color] duration-150 ease-out",
												section.level === 3 && "pl-6",
												activeId === section.id
													? "bg-muted font-medium text-foreground"
													: "text-muted-foreground hover:bg-muted hover:text-foreground",
											)}
										>
											<span className="truncate">{section.title}</span>
										</a>
									</li>
								))}
							</ul>
						</nav>
					) : null}
				</div>
			</aside>

			<div className="flex min-w-0 flex-col gap-8 md:col-span-9">
				<h1 className="text-heading-40 text-pretty">{project.title}</h1>

				{project.mainImage?.url ? (
					<div className="overflow-hidden rounded-lg border border-border">
						<img
							src={project.mainImage.url}
							alt={project.mainImage.alt ?? project.title}
							className="aspect-[16/9] size-full object-cover object-center"
						/>
					</div>
				) : null}

				<div className="content w-full max-w-none">
					<PortableBody value={project.body ?? []} />
				</div>
			</div>
		</article>
	);
}
