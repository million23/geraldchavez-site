import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
			answer:
				"I studied in the University of Caloocan City, taking up Bachelor of Science in Computer Science. I graduated last June 2023",
		},
		{
			question: "What did you focus on during your studies?",
			answer:
				"I focused on web development, specifically front-end development. I also studied a principles and practices of Interface and Experience design.",
		},
	],
	life: [
		{
			question: "What are your favorite video games?",
			answer:
				"My favorite video games Hollow Knight, Blasphemous, Borderlands(1, of course), Castlevania,  and Assassin's Creed(all of them, except the 3D platformer ones - they suck).",
		},
		{
			question: "What is your favorite music genre?",
			answer:
				"I love listening to Oriental House, Electro French, and also Ariana Grande(dont judge me, i just love her).",
		},
		{
			question: "What are your hobbies?",
			answer:
				"I love playing video games, code exaggerated ideas, and I also DJ.",
		},
	],
	work: [
		{
			question: "Where do you work?",
			answer:
				"I currently work at OTis Philippines Inc. as a Software Engineer.",
		},
		{
			question: "What do you do at work?",
			answer:
				"I work as a front-end developer and UI/UX designer. I also work as a back-end developer, but I'm not that good at it.",
		},
		{
			question: "When did you start working?",
			answer:
				"I started working post-graduation last July 2023. But, I started working as a freelancer last 2021.",
		},
		{
			question: "What kind of projects do you work on years ago?",
			answer:
				"I worked on a lot of projects, from websites to web applications. I also worked on a few mobile applications, online wedding invitations, and a lot more.",
		},
		{
			question: "Do you have a portfolio?",
			answer: "Yes, I do. You can check it out by using the navigation bar",
		},
	],
};

const Biography = () => {
	return (
		<Tabs defaultValue={BiographyTabs.WORK} className="w-full">
			<TabsList className="flex justify-center">
				<TabsTrigger value="work">Professional Work</TabsTrigger>
				<TabsTrigger value="education">Education</TabsTrigger>
				<TabsTrigger value="life">Personal Life</TabsTrigger>
			</TabsList>
			<TabsContent
				value={BiographyTabs.EDUCATION}
				className="grid grid-cols-1 md:grid-cols-2 gap-5"
			>
				{biographyContents.education.map((content, index) => (
					<div className="flex flex-col gap-2 p-2">
						<h5 className="underline">{content.question}</h5>
						<p>{content.answer}</p>
					</div>
				))}
			</TabsContent>

			<TabsContent
				value={BiographyTabs.LIFE}
				className="grid grid-cols-1 md:grid-cols-2 gap-5"
			>
				{biographyContents.life.map((content, index) => (
					<div className="flex flex-col gap-2 p-2">
						<h5 className="underline">{content.question}</h5>
						<p>{content.answer}</p>
					</div>
				))}
			</TabsContent>

			<TabsContent
				value={BiographyTabs.WORK}
				className="grid grid-cols-1 md:grid-cols-2 gap-5"
			>
				{biographyContents.work.map((content, index) => (
					<div className="flex flex-col gap-2 p-2">
						<h5 className="underline">{content.question}</h5>
						<p>{content.answer}</p>
					</div>
				))}
			</TabsContent>
		</Tabs>
	);
};

export default Biography;
