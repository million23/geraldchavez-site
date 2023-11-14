import Page from "@/components/page-content";
import WebsiteBuilder from "@/components/website-builder";

const ServicePage = () => {
	return (
		<Page title="Get a quote">
			<h2>Get a quote</h2>
			<p>Here is a boilerplate maker for your next website.</p>
			<p>Build your website and fill up the form below to get a quote.</p>

			<div className="mt-10">
				<WebsiteBuilder />
			</div>
		</Page>
	);
};

export default ServicePage;
