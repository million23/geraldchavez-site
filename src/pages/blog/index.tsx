import Page from "@/components/page-content";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);

interface BlogPageProps {
	data: {
		blogs: {
			title: string;
			slug: string;
			category: string;
			publishedAt: string;
			updatedAt: string;
			blogContent: string;
			id: string;
		}[];
	};
}

const BlogPage = () => {
	const fetchBlogs = async () => {
		const res = await fetch("/api/get-post");
		const data = (await res.json()) as PostData[];

		const sorted = data.sort((a, b) => {
			return (
				dayjs(b.publishedAt).valueOf() - dayjs(a.publishedAt).valueOf()
			);
		});

		return sorted;
	};

	const _blogs = useQuery({
		queryKey: ["blogs.all"],
		queryFn: fetchBlogs,
		staleTime: 1000 * 60 * 60,
		keepPreviousData: true,
	});

	return (
		<Page title="Blogs" className="w-full max-w-5xl mx-auto pt-32">
			<h2>Blogs</h2>
			<p className="max-w-xl">
				Here, I will be posting my blogs. I will use this as a way to
				document my journey as a developer. I will also use this as a
				way to share my knowledge and experience with others. I hope you
				enjoy reading my blogs.
			</p>

			<div className="mt-16 flex flex-wrap">
				{_blogs.isLoading &&
					Array(4)
						.fill(0)
						.map((_, i) => (
							<div className="p-2 w-full md:w-1/2">
								<Skeleton
									key={`blogcard_loader_${i}`}
									className="h-[200px] "
								/>
							</div>
						))}
				{_blogs.isSuccess &&
					_blogs.data.map((blog) => (
						<Link
							href={`/blog/${blog.slug}`}
							className="cursor-pointer hover:text-primary transition-all space-y-2 w-full md:w-1/2 p-2	"
						>
							<div className="border border-border rounded-lg overflow-hidden h-max">
								<figure className="relative h-[250px] w-full">
									<Image
										src={blog.mainImage.url}
										alt={blog.mainImage.alt}
										fill
										className="object-cover"
									/>

									{dayjs(blog.publishedAt).isAfter(
										dayjs().subtract(2, "week")
									) && (
										<Badge
											variant="default"
											className="absolute top-2 right-2 z-10 select-none"
										>
											NEW
										</Badge>
									)}
								</figure>
								<div className="p-4">
									<h5>{blog.title}</h5>
									<p className="text-sm">
										{dayjs(blog.publishedAt).format(
											"MMMM DD, YYYY"
										)}
									</p>
									<div className="mt-4 flex flex-wrap gap-2">
										{blog.categories
											.sort((a, b) => a.localeCompare(b))
											.map((cat) => (
												<Badge variant="outline">
													{cat}
												</Badge>
											))}
									</div>
								</div>
							</div>
						</Link>
					))}
			</div>
		</Page>
	);
};

export default BlogPage;
