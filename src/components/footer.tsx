export function Footer() {
	return (
		<footer className="mt-32 flex flex-col gap-6 py-10" id="footer">
			<p className="text-copy-16 text-muted-foreground">Had a project idea?</p>
			<h2 className="text-heading-40">Let's build together</h2>

			<a
				className="mt-10 text-copy-20"
				href="mailto:chavezgerald23@gmail.com"
			>
				chavezgerald23@gmail.com
			</a>

			<div className="h-px w-full bg-border" />
			<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
				<div className="flex gap-6">
					<a
						href="https://www.linkedin.com/in/geraldchavez23/"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
					<a
						href="https://www.instagram.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Instagram
					</a>
				</div>
				<p className="mt-6 flex-1 text-label-13 text-muted-foreground lg:mt-0 lg:text-right">
					© {new Date().getFullYear()} Gerald Chavez.
				</p>
			</div>
		</footer>
	);
}
