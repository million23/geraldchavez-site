import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

import { Badge } from "./ui/badge";
import { TbHandFinger } from "react-icons/tb";
import { motion } from "framer-motion";

enum BiographyTabs {
	EDUCATION = "education",
	LIFE = "life",
	WORK = "work",
}

type BiographyContents = {
	education: {
		question: string;
		answer: string;
	}[];
	life: {
		question: string;
		answer: string;
	}[];
	work: {
		question: string;
		answer: string;
	}[];
};

const biographyContents: BiographyContents = {
	education: [
		{
			question: "What college did you attend? What did you study?",
			answer: "I studied in the University of Caloocan City, taking up Bachelor of Science in Computer Science. I graduated last June 2023",
		},
		{
			question: "What did you focus on during your studies?",
			answer: "I focused on web development, specifically front-end development. I also studied UI/UX design on my own.",
		},
	],
	life: [
		{
			question: "What are your hobbies?",
			answer: "I play video games, code exaggerated ideas, and I also DJ.",
		},
		{
			question: "What do you love doing?",
			answer: "I love teaching people how to get started with web development, especially students who has passion for it. (With Next.js, of course)",
		},
		{
			question: "What are your favorite video games?",
			answer: "My favorite video games Hollow Knight, Castlevania, Final Fantasy, Just Dance, Blasphemous, Borderlands, and Assassin's Creed.",
		},
		{
			question: "What is your favorite music genre?",
			answer: "I love listening to Video Game OSTs, Oriental House, Electro French, and also Ariana Grande(dont judge me, i just love her).",
		},
	],
	work: [
		{
			question: "Where do you work?",
			answer: "I currently work at OTis Philippines Inc. as a Software Engineer.",
		},
		{
			question: "What do you do at work?",
			answer: "I work as a front-end developer and UI/UX designer. I also work as a back-end developer, but I'm not that good at it.",
		},
		{
			question: "When did you start working?",
			answer: "I started working post-graduation last July 2023. But, I started working as a freelancer last 2021.",
		},
		{
			question: "What kind of projects do you work on years ago?",
			answer: "I worked on a lot of projects, from websites to web applications. I also worked on a few mobile applications, online wedding invitations, and a lot more.",
		},
		{
			question: "Do you have a portfolio?",
			answer: "Yes, I do. You can check it out by using the navigation bar",
		},
	],
};

const Biography = () => {
	return (
		<>
			<Carousel
				className="w-full max-w-4xl mx-auto"
				opts={{
					align: "center",
					loop: true,
				}}
			>
				<CarouselContent>
					{biographyContents.education.map((content, index) => (
						<CarouselItem className="md:basis-1/2">
							<div className="flex flex-col gap-2 p-2">
								<Badge
									variant="outline"
									className="text-pink-500"
								>
									Education
								</Badge>
								<h2 className="text-3xl">{content.question}</h2>
								<p>{content.answer}</p>
							</div>
						</CarouselItem>
					))}
					{biographyContents.life.map((content, index) => (
						<CarouselItem className="md:basis-1/2">
							<div className="flex flex-col gap-2 p-2">
								<Badge
									variant="outline"
									className="text-blue-500"
								>
									Life
								</Badge>
								<h2 className="text-3xl">{content.question}</h2>
								<p>{content.answer}</p>
							</div>
						</CarouselItem>
					))}
					{biographyContents.work.map((content, index) => (
						<CarouselItem className="md:basis-1/2">
							<div className="flex flex-col gap-2 p-2">
								<Badge
									variant="outline"
									className="text-green-500"
								>
									Work
								</Badge>
								<h2 className="text-3xl">{content.question}</h2>
								<p>{content.answer}</p>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselNext className="hidden lg:inline-flex" />
				<CarouselPrevious className="hidden lg:inline-flex" />
			</Carousel>

			<motion.div
				animate={{
					translateX: [20, -20],
					opacity: [0, 0.3, 0],
					transition: { duration: 2, repeat: Infinity },
				}}
				className="flex lg:hidden justify-center items-center gap-2 mt-1 w-max mx-auto"
			>
				<TbHandFinger className="text-xl" />
			</motion.div>
		</>
	);
};

export default Biography;
