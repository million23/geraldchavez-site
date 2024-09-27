import { motion } from "framer-motion";

const TopGradientGlow = () => {
	const meshGradientColorPoints = [
		"#DB0C36",
		"#7EB1A8",
		"#EAD292",
		"#FDAB88",
		"#DB0C36",
		"#7EB1A8",
		"#EAD292",
		"#FDAB88",
		"#DB0C36",
		"#7EB1A8",
		"#EAD292",
		"#FDAB88",
	];

	return (
		<div className="absolute h-[200px] w-full top-0 left-0 z-10 pointer-events-none overflow-hidden dark:opacity-30">
			{meshGradientColorPoints.map((color, i) => (
				<motion.div
					animate={{
						left: ["-50%", "75%"],
						opacity: [0, 0.4, 0],
						transition: {
							duration: Math.random() * 5 + 5,
							repeat: Infinity,
							ease: "linear",
							repeatType: "loop",
							delay: Math.random() * 5 * -5,
						},
					}}
					key={i}
					style={{
						background: `radial-gradient(ellipse at top, ${color} 0%, transparent ${
							Math.random() * 15 + 50
						}%)`,
					}}
					className="absolute top-[-100px] left-0 h-[100%] w-[500px] blur-lg"
				/>
			))}
		</div>
	);
};

export default TopGradientGlow;
