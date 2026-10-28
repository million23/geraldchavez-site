import { Fragment } from "react";

interface SpanChild {
	_key: string;
	_type: "span";
	text: string;
	marks?: string[];
}

interface MarkDef {
	_key: string;
	_type: string;
	href?: string;
}

interface TextBlock {
	_key: string;
	_type: "block";
	style?: string;
	listItem?: string;
	children?: SpanChild[];
	markDefs?: MarkDef[];
}

interface ImageBlock {
	_key: string;
	_type: "image";
	url?: string;
	alt?: string;
}

interface CodeBlock {
	_key: string;
	_type: "code" | "Code Block";
	code?: string;
	language?: string;
}

type BodyBlock = TextBlock | ImageBlock | CodeBlock;

export interface BodySection {
	id: string;
	title: string;
	level: 2 | 3;
}

function isTextBlock(block: BodyBlock): block is TextBlock {
	return block._type === "block";
}

function blockText(block: TextBlock) {
	return (block.children ?? []).map((child) => child.text).join("");
}

function slugify(text: string, key: string) {
	const slug = text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
	return slug || key;
}

function headingId(block: TextBlock) {
	if (block.style !== "h2" && block.style !== "h3") return undefined;
	const title = blockText(block).trim();
	if (!title) return undefined;
	return slugify(title, block._key);
}

export function getBodySections(value: unknown[]) {
	const blocks = value as BodyBlock[];
	const used = new Set<string>();
	const sections: BodySection[] = [];

	for (const block of blocks) {
		if (!isTextBlock(block)) continue;
		const title = blockText(block).trim();
		const id = headingId(block);
		if (!id || !title) continue;
		let unique = id;
		if (used.has(unique)) unique = `${id}-${block._key}`;
		used.add(unique);
		sections.push({
			id: unique,
			title,
			level: block.style === "h3" ? 3 : 2,
		});
	}

	return sections;
}

function renderMarks(child: SpanChild, markDefs: MarkDef[]) {
	let node: React.ReactNode = child.text;
	for (const mark of child.marks ?? []) {
		if (mark === "strong") {
			node = <strong>{node}</strong>;
		} else if (mark === "em") {
			node = <em>{node}</em>;
		} else if (mark === "code") {
			node = <code>{node}</code>;
		} else {
			const def = markDefs.find((item) => item._key === mark);
			if (def?._type === "link" && def.href) {
				node = <a href={def.href}>{node}</a>;
			}
		}
	}
	return <Fragment key={child._key}>{node}</Fragment>;
}

function BlockCopy({ block, id }: { block: TextBlock; id?: string }) {
	const inner = (block.children ?? []).map((child) =>
		renderMarks(child, block.markDefs ?? []),
	);
	switch (block.style) {
		case "h1":
			return (
				<h1 id={id} className="scroll-mt-24 text-heading-32">
					{inner}
				</h1>
			);
		case "h2":
			return (
				<h2 id={id} className="scroll-mt-24 text-heading-24">
					{inner}
				</h2>
			);
		case "h3":
			return (
				<h3 id={id} className="scroll-mt-24 text-heading-20">
					{inner}
				</h3>
			);
		case "h4":
			return (
				<h4 id={id} className="scroll-mt-24 text-heading-16">
					{inner}
				</h4>
			);
		case "blockquote":
			return (
				<blockquote className="text-copy-18 text-muted-foreground">
					{inner}
				</blockquote>
			);
		default:
			return <p>{inner}</p>;
	}
}

export function PortableBody({ value }: { value: unknown[] }) {
	const blocks = value as BodyBlock[];
	const nodes: React.ReactNode[] = [];
	const usedIds = new Set<string>();

	function uniqueHeadingId(block: TextBlock) {
		const id = headingId(block);
		if (!id) return undefined;
		let unique = id;
		if (usedIds.has(unique)) unique = `${id}-${block._key}`;
		usedIds.add(unique);
		return unique;
	}

	for (let i = 0; i < blocks.length; i += 1) {
		const block = blocks[i];
		if (!block) continue;

		if (isTextBlock(block) && block.listItem === "bullet") {
			const items: TextBlock[] = [block];
			while (i + 1 < blocks.length) {
				const next = blocks[i + 1];
				if (!next || !isTextBlock(next) || next.listItem !== "bullet") break;
				items.push(next);
				i += 1;
			}
			nodes.push(
				<ul key={block._key}>
					{items.map((item) => (
						<li key={item._key}>
							{(item.children ?? []).map((child) =>
								renderMarks(child, item.markDefs ?? []),
							)}
						</li>
					))}
				</ul>,
			);
			continue;
		}

		if (isTextBlock(block)) {
			nodes.push(
				<BlockCopy
					key={block._key}
					block={block}
					id={uniqueHeadingId(block)}
				/>,
			);
			continue;
		}

		if (block._type === "image" && "url" in block && block.url) {
			nodes.push(
				<img
					key={block._key}
					src={block.url}
					alt={block.alt ?? ""}
					className="w-full rounded-lg border border-border object-cover object-center"
				/>,
			);
			continue;
		}

		if (
			(block._type === "code" || block._type === "Code Block") &&
			"code" in block &&
			block.code
		) {
			nodes.push(
				<pre
					key={block._key}
					className="overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-copy-13-mono"
				>
					{block.language ? (
						<span className="mb-5 block text-end text-muted-foreground">
							{block.language}
						</span>
					) : null}
					<code className="bg-transparent p-0">{block.code}</code>
				</pre>,
			);
		}
	}

	return <>{nodes}</>;
}
