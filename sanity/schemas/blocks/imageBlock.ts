import { defineType, defineField } from "sanity";

export default defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      caption: "caption",
      media: "image",
    },
    prepare({ caption, media }) {
      return {
        title: caption || "Image",
        media,
      };
    },
  },
});
