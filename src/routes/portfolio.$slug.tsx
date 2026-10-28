import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio/$slug")({
	component: PortfolioPage,
});

function PortfolioPage() {
	const { slug } = Route.useParams();
	return <div className="py-10 text-copy-14">{slug}</div>;
}
