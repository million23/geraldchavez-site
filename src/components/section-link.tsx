import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import type { ComponentProps, MouseEvent } from "react";
import { useSectionCurtain } from "#/components/section-curtain";

type SectionLinkProps = ComponentProps<typeof Link>;

export function SectionLink({ onClick, ...props }: SectionLinkProps) {
	const router = useRouter();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { runSectionCurtain } = useSectionCurtain();

	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}

		event.preventDefault();

		const location = router.buildLocation({
			to: props.to,
			params: props.params,
			search: props.search,
			hash: props.hash,
			replace: props.replace,
		} as Parameters<typeof router.buildLocation>[0]);

		void runSectionCurtain({
			fromPath: pathname,
			toPath: location.pathname,
			navigate: () =>
				router.navigate({
					to: props.to,
					params: props.params,
					search: props.search,
					hash: props.hash,
					replace: props.replace,
				} as Parameters<typeof router.navigate>[0]),
		});
	}

	return <Link {...props} onClick={handleClick} />;
}
