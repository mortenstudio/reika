import { defineType, defineField, ALL_FIELDS_GROUP } from "sanity";
import { DocumentIcon } from "@sanity/icons";

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
      default: true,
    },
    {
      name: "contentBlocks",
      title: "Content Blocks",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 6,
      description: "Intro text shown below the page title.",
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
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      of: [
        { type: "textBlock" },
        { type: "imagesBlock" },
        { type: "carouselBlock" },
        { type: "modelsBlock" },
        { type: "contactBlock" },
        { type: "accordionBlock" },
        { type: "stepsBlock" },
        { type: "cardsBlock" },
      ],
      group: "contentBlocks",
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
    select: {
      title: "name",
      subtitle: "introduction",
      media: "image",
    },
  },
});
