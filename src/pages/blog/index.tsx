import Page from "@/components/page-content";
import { Skeleton } from "@/components/ui/skeleton";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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

		return data;
	};

	const _blogs = useQuery({
		queryKey: ["blogs.all"],
		queryFn: fetchBlogs,
		staleTime: 1000 * 60 * 60,
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

			<div className="mt-16 flex flex-col gap-4">
				{_blogs.isLoading &&
					Array(4)
						.fill(0)
						.map((_, i) => (
							<Skeleton
								key={`blogcard_loader_${i}`}
								className="h-20"
							/>
						))}
				{_blogs.isSuccess &&
					_blogs.data.map((blog) => (
						<div className="p-5 border border-border rounded-md">
							<Link
								href={`/blog/${blog.slug}`}
								className="cursor-pointer hover:text-primary transition-all"
							>
								<h5>{blog.title}</h5>
								<p className="text-sm">
									{dayjs(blog.publishedAt).format(
										"MMMM DD, YYYY"
									)}
								</p>
							</Link>
						</div>
					))}
			</div>
		</Page>
	);
};

export default BlogPage;
