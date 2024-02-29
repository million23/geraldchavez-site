import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Page from "@/components/page-content";
import { Skeleton } from "@/components/ui/skeleton";
import $$hygraph from "@/lib/graph-client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { gql } from "graphql-request";
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
		const query = gql`
			{
				blogs {
					title
					slug
					category
					publishedAt
					updatedAt
					blogContent
					id
				}
			}
		`;

		const data = await $$hygraph.request(query);
		return data as BlogPageProps["data"];
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

			<div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
				{_blogs.isLoading &&
					Array(4)
						.fill(0)
						.map((_, i) => (
							<Skeleton
								key={`blogcard_loader_${i}`}
								className="h-40"
							/>
						))}
				{_blogs.isSuccess &&
					_blogs.data.blogs.map((blog) => (
						<Card key={blog.id} className="max-h-fit">
							<CardHeader>
								<Link
									href={`/blog/${blog.slug}`}
									className="cursor-pointer hover:text-primary transition-all"
								>
									<CardTitle>{blog.title}</CardTitle>
								</Link>
							</CardHeader>
							<CardContent>
								<p>
									{dayjs(blog.updatedAt).format(
										"MMMM DD, YYYY"
									)}
								</p>
							</CardContent>
						</Card>
					))}
			</div>
		</Page>
	);
};

export default BlogPage;
