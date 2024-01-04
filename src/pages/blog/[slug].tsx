import Page from "@/components/page-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import $$hygraph from "@/lib/graph-client";
import dayjs from "dayjs";
import { gql } from "graphql-request";
import { GetStaticPaths } from "next";
import Link from "next/link";
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

export const getStaticPaths = (async () => {
	const query = gql`
		{
			blogs {
				slug
			}
		}
	`;

	const data = (await $$hygraph.request(query)) as {
		blogs: { slug: string }[];
	};
	const paths = data.blogs.map((blog) => ({
		params: { slug: blog.slug },
	}));

	return {
		paths,
		fallback: true,
	};
}) satisfies GetStaticPaths;

export const getStaticProps = async (context: { params: { slug: string } }) => {
	const query = gql`
		query Blog {
			blog(where: { slug:  "${context.params.slug}"}) {
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
	return {
		props: { data },
		revalidate: 60 * 60 * 24, // 24 hours
	};
};

const BlogPost = ({ data }: { data: BlogPostProps["data"] }) => {
	return (
		<Page title="Blog">
			<Link href="/blog">
				<Button variant="ghost">
					<FiArrowLeft className="mr-2" />
					Back
				</Button>
			</Link>

			{!data ? (
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
			) : (
				<div className="flex flex-col gap-2 mt-10">
					<h2>{data.blog.title}</h2>
					<p className="text-opacity-50">
						{dayjs(data.blog.publishedAt).format("MMMM DD, YYYY")}
					</p>
					<div className="mt-6 flex gap-2 flex-wrap">
						{data.blog.category.map((cat) => (
							<Badge variant="outline">{cat}</Badge>
						))}
					</div>

					<div className="mt-16 markdown-content w-full max-w-none">
						<Markdown>{data.blog.blogContent}</Markdown>
					</div>

					<div className="sticky mt-5 bottom-10 flex justify-end px-2 z-10">
						<Button onClick={() => window.scrollTo(0, 0)}>
							Scroll to top
						</Button>
					</div>
				</div>
			)}
		</Page>
	);
};

export default BlogPost;
