import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import $$hygraph from "@/lib/graph-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { gql } from "graphql-request";
import Link from "next/link";

dayjs.extend(relativeTime);

export const getStaticProps = async () => {
	const query = gql`
      {
         blogs (orderBy: publishedAt_DESC) {
            title
            slug
            category
            publishedAt
            updatedAt
				id
         }
      }
   `;

	const data = await $$hygraph.request(query);
	return {
		props: {
			data,
		},
		revalidate: 60,
	};
};

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

const BlogPage = ({ data }: BlogPageProps) => {
	return (
		<div className="py-16">
			<h2>Blogs</h2>
			<p className="max-w-xl">
				Here, I will be posting my blogs. I will use this as a way to document
				my journey as a developer. I will also use this as a way to share my
				knowledge and experience with others. I hope you enjoy reading my blogs.
			</p>

			<div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
				{data.blogs.map((blog) => (
					<Card key={blog.id}>
						<CardHeader>
							<Link
								href={`/blog/${blog.slug}`}
								className="cursor-pointer hover:text-primary transition-all"
							>
								<CardTitle>{blog.title}</CardTitle>
							</Link>
						</CardHeader>
						<CardContent>
							<p>{dayjs(blog.updatedAt).format("MMMM DD, YYYY")}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default BlogPage;
