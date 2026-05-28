import { defineType, defineField } from "sanity";

export default defineType({
  name: "stepsBlock",
  title: "Steps",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "steps",
      title: "Steps",
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
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title,
                subtitle: subtitle ? subtitle.substring(0, 50) + "..." : "",
                media,
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
      heading: "heading",
      steps: "steps",
    },
    prepare({ heading, steps }) {
      return {
        title: heading || "Steps",
        subtitle: Array.isArray(steps) ? `${steps.length} steps` : "0 steps",
      };
    },
  },
});
