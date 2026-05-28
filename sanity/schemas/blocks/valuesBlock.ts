import { defineType, defineField } from "sanity";

export default defineType({
  name: "valuesBlock",
  title: "Values",
  type: "object",
  fields: [
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [
        {
          type: "text",
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "paragraphs",
    },
    prepare({ title }) {
      return {
        title: "Values Block",
        subtitle: Array.isArray(title) && title.length > 0
          ? title[0].substring(0, 50) + "..."
          : "",
      };
    },
  },
});
