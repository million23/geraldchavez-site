import { defineField, defineType } from "sanity";

export default defineType({
	type: "document",
	name: "portfolio",
	title: "Portfolio",
	fields: [
		defineField({
			type: "string",
			name: "title",
			title: "Title",
		}),
		defineField({
			type: "slug",
			name: "slug",
			title: "Slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			type: "image",
			name: "mainImage",
			title: "Main image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					type: "string",
					name: "alt",
					title: "Alternative Text",
				},
			],
		}),
		defineField({
			type: "date",
			name: "publishedAt",
			title: "Published at",
		}),
		defineField({
			type: "blockContent",
			name: "body",
			title: "Body",
		}),
	],

	preview: {
		select: {
			title: "title",
			media: "mainImage",
		},
	},
});
