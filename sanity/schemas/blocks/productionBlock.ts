import { defineType, defineField } from "sanity";

export default defineType({
  name: "productionBlock",
  title: "Production",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Optional heading for the production timeline section",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "Optional subheading or description",
    }),
    defineField({
      name: "phases",
      title: "Production Phases",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Phase Title",
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
              name: "duration",
              title: "Duration",
              type: "string",
              description: "e.g., '2-3 dager', '1 uke'",
            }),
            defineField({
              name: "features",
              title: "Key Features",
              type: "array",
              of: [{ type: "string" }],
              description: "List of key features or highlights for this phase",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              description: "Optional image or icon for this phase",
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "title",
              duration: "duration",
              media: "image",
            },
            prepare({ title, duration, media }) {
              return {
                title: title || "Untitled Phase",
                subtitle: duration || "",
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
      phases: "phases",
    },
    prepare({ heading, phases }) {
      return {
        title: heading || "Production Timeline",
        subtitle: Array.isArray(phases) ? `${phases.length} phases` : "0 phases",
      };
    },
  },
});

