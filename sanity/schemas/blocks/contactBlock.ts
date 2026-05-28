import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactBlock",
  title: "Contact",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Small label above the heading (e.g. KOM I GANG).",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "submitLabel",
      title: "Submit button label",
      type: "string",
      initialValue: "Send",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      badge: "badge",
    },
    prepare({ heading, badge }) {
      return {
        title: heading || "Contact",
        subtitle: badge || undefined,
      };
    },
  },
});
