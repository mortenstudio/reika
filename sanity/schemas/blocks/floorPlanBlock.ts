import { defineType, defineField } from "sanity";

export default defineType({
  name: "floorPlanBlock",
  title: "Floor plan",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "floorPlans",
      title: "Floor plans",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Floor plan",
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
              title: "caption",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "Floor plan",
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
      floorPlans: "floorPlans",
    },
    prepare({ heading, floorPlans }) {
      return {
        title: heading || "Floor plan",
        subtitle: Array.isArray(floorPlans)
          ? `${floorPlans.length} floor plan${floorPlans.length === 1 ? "" : "s"}`
          : "0 floor plans",
      };
    },
  },
});
