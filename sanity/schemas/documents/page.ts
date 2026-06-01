import { defineType, defineField, ALL_FIELDS_GROUP } from "sanity";
import { BlockElementIcon, DocumentIcon, EditIcon, SearchIcon } from "@sanity/icons";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
    {
      name: "general",
      title: "General",
      icon: EditIcon,
      default: true,
    },
    {
      name: "contentBlocks",
      title: "Content Blocks",
      icon: BlockElementIcon,
    },
    {
      name: "seo",
      title: "SEO",
      icon: SearchIcon,
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Internal page name used in navigation and listings.",
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier generated from the name.",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Optional header image.",
      group: "general",
    }),

    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 4,
      description: "Intro text shown below the page title.",
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      description: "Modular content sections that make up the page body.",
      of: [
        { type: "textBlock" },
        { type: "imagesBlock" },
        { type: "carouselBlock" },
        { type: "modelsBlock" },
        { type: "contactBlock" },
        { type: "accordionBlock" },
        { type: "cardsBlock" },
      ],
      group: "contentBlocks",
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
    select: {
      title: "name",
      subtitle: "introduction",
      media: "image",
    },
  },
});
