import Head from "next/head";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type PageProps = {
	title?: string;
	children?: React.ReactNode | React.ReactNode[] | string | string[];
	className?: string;
};

const Page: React.FC<PageProps> = ({
	children,
	title = "Untitled Page",
	className,
}) => {
	return (
		<>
			<Head>
				<title>{title} | Gerald Chavez</title>
				<meta
					property="og:image"
					content="https://geraldchavez.vercel.app/api/og"
				/>
			</Head>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
				className={twMerge("py-16", className)}
			>
				{children}
			</motion.div>
		</>
	);
};

export default Page;
