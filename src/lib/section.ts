export type SiteSection = "home" | "blog" | "portfolio" | "other";

export function sectionOf(pathname: string): SiteSection {
	if (pathname === "/" || pathname === "") return "home";
	if (pathname.startsWith("/blog")) return "blog";
	if (pathname.startsWith("/portfolio")) return "portfolio";
	return "other";
}
