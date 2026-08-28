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
      description: "Primary tagline displayed in the site header.",
      group: "general",
    }),
    defineField({
      name: "subtagline",
      title: "Subtagline",
      type: "string",
      description: "Secondary tagline shown beneath the main tagline.",
      group: "general",
    }),
    defineField({
      name: "contactFormEmail",
      title: "Contact form recipient",
      type: "email",
      description:
        "Email address that receives submissions from the contact form.",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      description: "Content displayed in the site footer.",
      group: "general",
      fields: [
        defineField({
          name: "contactText",
          title: "Contact Text",
          type: "string",
          description: "Heading text above the contact email link.",
        }),
        defineField({
          name: "contactEmail",
          title: "Contact Email",
          type: "string",
          description: "Email address displayed in the footer.",
        }),
        defineField({
          name: "contactEmailUrl",
          title: "Contact Email URL",
          type: "string",
          description: "Mailto or URL the email address links to.",
        }),
        defineField({
          name: "findUsText",
          title: "Find Us Text",
          type: "string",
          description: "Heading text above the address link.",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "string",
          description: "Physical address displayed in the footer.",
        }),
        defineField({
          name: "addressUrl",
          title: "Address URL",
          type: "url",
          description: "Link opened when the address is clicked (e.g. Google Maps).",
        }),
        defineField({
          name: "followUsText",
          title: "Follow Us Text",
          type: "string",
          description: "Heading text above the social media links.",
        }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          description: "List of social media profiles linked in the footer.",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "platform",
                  title: "Platform",
                  type: "string",
                  description: "Social media platform name.",
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
                  description: "Full URL to the social media profile.",
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
      description: "Pages shown in the main site navigation, in display order.",
      of: [
        { type: "reference", to: [{ type: "page" },{ type: "home" }] },
      ],
      group: "navigation",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Custom title for search engines. Falls back to the page name if left empty.",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 4,
      description: "Short summary displayed in search engine results (recommended 150–160 characters).",
      group: "seo",
    }),
    defineField({
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      description: "Image shown when the page is shared on social media.",
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
