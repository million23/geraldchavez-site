import Page from "@/components/page-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import $$hygraph from "@/lib/graph-client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { gql } from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";
import Markdown from "react-markdown";

interface BlogPostProps {
	data: {
		blog: {
			title: string;
			slug: string;
			category: string[];
			publishedAt: string;
			updatedAt: string;
			blogContent: string;
		};
	};
}
const BlogPost = () => {
	const router = useRouter();
	const { slug } = router.query;

	const fetchBlog = async () => {
		const query = gql`
         query Blog {
            blog(where: { slug:  "${slug}"}) {
               title
               slug
               category
               publishedAt
               updatedAt
               blogContent
            }
         }
      `;

		const data = (await $$hygraph.request(query)) as BlogPostProps["data"];
		return data.blog;
	};

	const _blog = useQuery({
		queryKey: ["blog", slug],
		enabled: !!slug,
		queryFn: fetchBlog,
	});

	return (
		<Page title="Blog" className="py-32 w-full max-w-5xl mx-auto">
			<Link href="/blog">
				<Button variant="ghost">
					<FiArrowLeft className="mr-2" />
					Back
				</Button>
			</Link>

			{_blog.isLoading && (
				<div className="flex flex-col gap-2 mt-10">
					<Skeleton className="h-10 w-3/4" />
					<Skeleton className="h-10 w-1/2" />
					<Skeleton className="h-4 w-1/3" />
					<Skeleton className="h-7 w-1/4 mt-5" />

					<div className="mt-16 flex flex-col gap-2">
						{Array(12)
							.fill(0)
							.map((_, i) => (
								<Skeleton
									className="h-7 w-full"
									style={{
										maxWidth: `${
											100 - Math.floor(Math.random() * 25)
										}%`,
									}}
								/>
							))}
					</div>
				</div>
			)}

			{!_blog.isLoading && _blog.isSuccess && (
				<div className="flex flex-col gap-2 mt-10">
					<h2>{_blog.data.title}</h2>
					<p className="text-opacity-50">
						{dayjs(_blog.data.publishedAt).format("MMMM DD, YYYY")}
					</p>
					<div className="mt-6 flex gap-2 flex-wrap">
						{_blog.data.category.map((cat) => (
							<Badge variant="outline">{cat}</Badge>
						))}
					</div>

					<div className="mt-16 markdown-content w-full max-w-none">
						<Markdown>{_blog.data.blogContent}</Markdown>
					</div>

					<div className="sticky mt-5 bottom-10 flex justify-end px-2 z-10">
						<Button onClick={() => window.scrollTo(0, 0)}>
							Scroll to top
						</Button>
					</div>
				</div>
			)}

			{_blog.isError && (
				<div className="flex flex-col gap-2 mt-10">
					<h2>Something went wrong</h2>
					<p className="text-opacity-50">
						We were unable to fetch the blog post. Please try again
						later.
					</p>
				</div>
			)}
		</Page>
	);
};

export default BlogPost;
