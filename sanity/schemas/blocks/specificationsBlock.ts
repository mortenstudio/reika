import { defineField, defineType } from "sanity";

export default defineType({
  name: "specificationsBlock",
  title: "Specifications",
  type: "object",
  description:
    "Displays specification fields from the General tab on this model.",
  fields: [
    defineField({
      name: "placeholder",
      type: "string",
      hidden: true,
      readOnly: true,
      initialValue: "general",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Spesifikasjoner",
        subtitle: "Uses fields from General tab",
      };
    },
  },
});
