import Page from "@/components/page-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import $$sanity from "@/lib/sanity.client";
import { PostData } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import dayjs from "dayjs";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpCircleIcon, CopyIcon } from "lucide-react";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";

import { useTheme } from "next-themes";
import { Highlight, themes as codeTheme } from "prism-react-renderer";

export const getStaticPaths = (async () => {
	const fetchPortfolio = async () => {
		const q = groq`
			*[_type == "post"] {
                _id,
                publishedAt,
                categories,
                mainImage { alt, "url": asset -> url },
                title,
                "slug": slug.current,
                body
            }
		`;

		const data = await $$sanity.fetch(q);
		return data as Promise<PostData[]>;
	};

	const data = (await fetchPortfolio()) as PostData[];

	const paths = data.map((post) => ({
		params: { slug: post.slug },
	}));

	return { paths, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
	const slug = context.params?.slug as string;
	const q = groq`
			*[_type == "post" && slug.current == "${slug}"] {
                _id,
                publishedAt,
                categories,
                mainImage { alt, "url": asset -> url },
                title,
                "slug": slug.current,
                body
            }
		`;

	const data = (await $$sanity.fetch(q)) as PostData[];
	return { props: { data: data[0] } };
}) satisfies GetStaticProps;

const BlogPost = ({ data }: { data: PostData }) => {
	const { scrollY } = useScroll();
	const [isScrolled, setIsScrolled] = useState(false);
	const { theme } = useTheme();

	useMotionValueEvent(scrollY, "change", (latest) => {
		setIsScrolled(latest > 250);
	});

	return (
		<Page title="Blog" className="mx-auto w-full max-w-5xl">
			<Link href="/blog">
				<Button variant="ghost">
					<FiArrowLeft className="mr-2" />
					Back
				</Button>
			</Link>

			<div className="flex flex-col gap-2 mt-32 lg:mt-40">
				<h2>{data.title}</h2>
				<p className="text-opacity-50">
					{dayjs(data.publishedAt).format("MMMM DD, YYYY")}
				</p>
				<div className="mt-6 flex gap-2 flex-wrap">
					{data.categories.map((cat) => (
						<Badge variant="outline">{cat}</Badge>
					))}
				</div>

				<div className="mt-32 content w-full max-w-none">
					<PortableText
						value={data.body}
						components={{
							types: {
								"Code Block": (props) => (
									<div className="flex flex-col p-3 pb-0 gap-0 relative group">
										<div className="flex items-center w-full">
											<code className="bg-transparent text-sm text-end w-full">
												{props.value?.language}
											</code>
										</div>
										<div className="bg-transparent">
											<Highlight
												theme={
													theme === "light"
														? codeTheme.github
														: codeTheme.dracula
												}
												code={props.value?.code}
												language={props.value?.language}
											>
												{({
													className,
													style,
													tokens,
													getLineProps,
													getTokenProps,
												}) => (
													<pre
														style={style}
														className="bg-transparent m-0"
													>
														{tokens.map(
															(line, i) => (
																<div
																	key={i}
																	{...getLineProps(
																		{ line }
																	)}
																	className="bg-transparent"
																>
																	<span className="bg-transparent mr-5 opacity-50">
																		{i + 1}
																	</span>
																	{line.map(
																		(
																			token,
																			key
																		) => (
																			<span
																				key={
																					key
																				}
																				{...getTokenProps(
																					{
																						token,
																					}
																				)}
																			/>
																		)
																	)}
																</div>
															)
														)}
													</pre>
												)}
											</Highlight>
										</div>
										<div className=" flex justify-end mt-2  z-10">
											<Button
												variant="outline"
												size="icon"
												onClick={() => {
													navigator.clipboard.writeText(
														props.value?.code
													);
													toast.success(
														"Code copied to clipboard"
													);
												}}
											>
												<CopyIcon size={16} />
											</Button>
										</div>
									</div>
								),
							},
						}}
					/>
				</div>

				<motion.div
					animate={{
						opacity: isScrolled ? 1 : 0,
						translateY: isScrolled ? 0 : 20,
						transition: {
							duration: 0.2,
							ease: "easeInOut",
						},
					}}
					className="sticky mt-5 bottom-10 flex justify-end px-2 z-10"
				>
					<Button
						onClick={() => window.scrollTo(0, 0)}
						variant="outline"
						size="icon"
					>
						<ArrowUpCircleIcon />
					</Button>
				</motion.div>
			</div>
		</Page>
	);
};

export default BlogPost;
