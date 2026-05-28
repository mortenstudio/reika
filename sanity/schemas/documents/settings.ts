import { ALL_FIELDS_GROUP, defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
    {
      name: "general",
      title: "General",
      default: true,
    },
    {
      name: "navigation",
      title: "Navigation",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      description: "Site name presented in the browser.",
      group: "general",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 4,
      description: "Site description presented in SEO.",
      group: "general",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "subtagline",
      title: "Subtagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "general",
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
          type: "string",
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
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "page" },{ type: "home" }] },
      ],
      group: "navigation",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 4,
      group: "seo",
    }),
    defineField({
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
