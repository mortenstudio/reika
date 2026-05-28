import { defineType, defineField } from "sanity";

export default defineType({
  name: "footerBlock",
  title: "Footer",
  type: "object",
  fields: [
    defineField({
      name: "contactText",
      title: "Contact Text",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactEmailUrl",
      title: "Contact Email URL",
      type: "url",
    }),
    defineField({
      name: "findUsText",
      title: "Find Us Text",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "addressUrl",
      title: "Address URL",
      type: "url",
    }),
    defineField({
      name: "followUsText",
      title: "Follow Us Text",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Twitter", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      contactText: "contactText",
    },
    prepare({ contactText }) {
      return {
        title: "Footer Block",
        subtitle: contactText || "No contact text",
      };
    },
  },
});
