import { defineType, defineField } from "sanity";

export default defineType({
    name: "typeBlock",
    title: "Type",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
        }),
        defineField({
            name: "models",
            title: "Models",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "model" }],
                },
            ],
            validation: (Rule) => Rule.min(1),
        }),
    ],
    preview: {
        select: {
            title: "title",
            heading: "heading",
            models: "models",
        },
        prepare({ title, heading, models }) {
            return {
                title: title,
                subtitle: `${title} - ${heading} - ${models.length} models`,
            };
        },
    },
});