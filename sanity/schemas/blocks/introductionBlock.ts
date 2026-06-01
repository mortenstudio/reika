import { defineType, defineField } from "sanity";

export default defineType({
  name: "introductionBlock",
  title: "Introduction",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare({ title }) {
      return {
        title: "Introduction Block",
        subtitle: title ? title.substring(0, 50) + "..." : "",
      };
    },
  },
});
