import { defineType, defineField } from "sanity";

export default defineType({
    name: "intTypeBlock",
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
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare({ title}) {
            return {
                title: title,
            };
        },
    },
});