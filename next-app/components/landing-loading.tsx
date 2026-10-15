import { motion } from "framer-motion";

const LandingLoading = () => {
	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed top-0 left-0 w-full h-screen z-[999] bg-background "
		>
			<div className="fixed top-0 left-0 w-full h-screen flex flex-col gap-5 overflow-clip rotate-[-10deg] scale-[1.3]">
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<>
							<motion.div
								initial={{ translateX: 0 }}
								animate={{
									translateX: -200,
								}}
								transition={{
									duration: 6,
									repeat: Infinity,
									delay: i * -0.4,
									ease: "linear",
								}}
								className="flex items-center gap-5 flex-nowrap overflow-clip w-max"
							>
								<p className="text-8xl font-bold">
									GERALD CHAVEZ
								</p>
								<p className="text-8xl font-bold">
									GERALD CHAVEZ
								</p>
								<p className="text-8xl font-bold">
									GERALD CHAVEZ
								</p>
							</motion.div>
							<motion.div
								initial={{ translateX: 200 }}
								animate={{
									translateX: -100,
									opacity: [0, 1, 0],
								}}
								transition={{
									duration: 5,
									repeat: Infinity,
									delay: i * -0.4,
									ease: "linear",
								}}
								className="flex items-center gap-5 flex-nowrap overflow-clip w-max text-primary"
							>
								<p className="text-8xl font-bold">
									GERALD CHAVEZ
								</p>
								<p className="text-8xl font-bold">
									GERALD CHAVEZ
								</p>
								<p className="text-8xl font-bold">
									GERALD CHAVEZ
								</p>
							</motion.div>
						</>
					))}
			</div>
		</motion.div>
	);
};

export default LandingLoading;
