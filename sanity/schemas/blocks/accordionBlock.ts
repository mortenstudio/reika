import { defineType, defineField } from "sanity";

export default defineType({
  name: "accordionBlock",
  title: "Accordion",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Accordion Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "content",
            },
            prepare({ title, subtitle }) {
              return {
                title: title,
                subtitle: subtitle ? subtitle.substring(0, 50) + "..." : "",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Accordion Block",
        subtitle: Array.isArray(items) ? `${items.length} items` : "0 items",
      };
    },
  },
});
