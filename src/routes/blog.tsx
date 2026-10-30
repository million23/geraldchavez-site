import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { SectionLink } from "#/components/section-link";
import { Badge } from "#/components/ui/badge";
import {
	type BlogPost,
	formatPostDate,
	postsQueryOptions,
	titleCase,
} from "#/lib/blog";

export const Route = createFileRoute("/blog")({
	head: () => ({
		meta: [{ title: "Blog | Gerald Chavez" }],
	}),
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(postsQueryOptions).catch(() => []),
	component: BlogPage,
});

function filedUnder(post: BlogPost) {
	return (post.categories ?? []).slice().sort((a, b) => a.localeCompare(b))[0];
}

function BlogPage() {
	const posts = useQuery(postsQueryOptions);
	const items = posts.data ?? [];
	const featured = items[0];
	const rest = items.slice(1);

	return (
		<div className="flex min-h-[100svh] flex-col gap-16 py-10">
			<div className="flex max-w-[65ch] flex-col gap-3">
				<h1 className="text-heading-40">Blog</h1>
				<p className="text-copy-20 text-muted-foreground">
					Short notes from work at OTis and class at CIIT.
				</p>
			</div>

			{posts.isPending && (
				<div className="flex flex-col gap-16">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-12">
						<div className="aspect-[16/9] animate-pulse rounded-lg bg-muted motion-reduce:animate-none md:col-span-7" />
						<div className="flex flex-col justify-end gap-3 md:col-span-5">
							<div className="h-8 w-3/4 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
							<div className="h-4 w-32 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
						</div>
					</div>
					<div className="flex flex-col">
						{Array.from({ length: 4 }, (_, i) => (
							<div
								key={`blog_loader_${i + 1}`}
								className="flex min-h-16 items-center gap-4 border-b border-border"
							>
								<div className="size-12 shrink-0 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
								<div className="h-4 w-1/2 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
							</div>
						))}
					</div>
				</div>
			)}

			{posts.isSuccess && items.length === 0 && (
				<p className="text-copy-14">
					No notes here yet. They show up when a piece of work taught me
					something worth keeping.
				</p>
			)}

			{posts.isSuccess && featured && (
				<>
					<SectionLink
						to="/blog/$slug"
						params={{ slug: featured.slug }}
						className="group grid grid-cols-1 gap-6 text-foreground no-underline md:grid-cols-12"
					>
						<div className="overflow-hidden rounded-lg border border-border transition-[border-color] duration-150 ease-out group-hover:border-[var(--ds-gray-500)] md:col-span-7">
							{featured.mainImage?.url ? (
								<img
									src={featured.mainImage.url}
									alt={featured.mainImage.alt ?? featured.title}
									className="aspect-[16/9] size-full object-cover object-center"
								/>
							) : (
								<div className="aspect-[16/9] bg-muted" />
							)}
						</div>
						<div className="flex flex-col justify-end gap-3 md:col-span-5">
							<p className="text-label-13 text-muted-foreground">Latest</p>
							<h2 className="text-heading-32 text-pretty">{featured.title}</h2>
							<div className="flex flex-wrap items-baseline gap-3">
								{filedUnder(featured) ? (
									<Badge>{titleCase(filedUnder(featured) ?? "")}</Badge>
								) : null}
								<p className="text-label-13-mono text-muted-foreground">
									{featured.publishedAt
										? formatPostDate(featured.publishedAt)
										: ""}
								</p>
							</div>
						</div>
					</SectionLink>

					{rest.length > 0 ? (
						<div className="flex flex-col gap-6">
							<h2 className="text-heading-16">Earlier</h2>
							<ul className="flex flex-col">
								{rest.map((post) => (
									<li
										key={post._id}
										className="relative border-b border-border before:absolute before:inset-y-0 before:left-1/2 before:z-0 before:w-screen before:-translate-x-1/2 before:bg-transparent before:transition-[background-color] before:duration-150 before:ease-out before:content-[''] hover:before:bg-[var(--ds-gray-200)]"
									>
										<SectionLink
											to="/blog/$slug"
											params={{ slug: post.slug }}
											className="relative z-10 flex w-full min-h-16 items-center gap-4 py-3 text-foreground no-underline"
										>
											{post.mainImage?.url ? (
												<img
													src={post.mainImage.url}
													alt={post.mainImage.alt ?? post.title}
													className="size-12 shrink-0 rounded-md object-cover object-center"
												/>
											) : (
												<div className="size-12 shrink-0 rounded-md bg-muted" />
											)}
											<h3 className="min-w-0 flex-1 text-heading-16 truncate">
												{post.title}
											</h3>
											{filedUnder(post) ? (
												<Badge className="hidden shrink-0 md:inline-flex">
													{titleCase(filedUnder(post) ?? "")}
												</Badge>
											) : null}
											<p className="shrink-0 text-label-13-mono text-muted-foreground">
												{post.publishedAt
													? formatPostDate(post.publishedAt)
													: ""}
											</p>
										</SectionLink>
									</li>
								))}
							</ul>
						</div>
					) : null}
				</>
			)}
		</div>
	);
}
