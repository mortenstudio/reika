import { defineType, defineField } from "sanity";

export default defineType({
  name: "modelsBlock",
  title: "Models",
  type: "object",
  fields: [
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
      title: "models",
    },
    prepare({ title }) {
      return {
        title: "Models Block",
        subtitle: Array.isArray(title) ? `${title.length} models` : "0 models",
      };
    },
  },
});
