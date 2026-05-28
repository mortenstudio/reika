import { ALL_FIELDS_GROUP, defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
    {
      name: "general",
      title: "General",
    },
    {
      name: "content",
      title: "Content",
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
      description: "Label used in site navigation (e.g. Hjem).",
      initialValue: "Hjem",
      group: "general",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "heroBlock",
      group: "general",
    }),
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      group: "content",
      of: [
        { type: "introductionBlock" },
        { type: "valuesBlock" },
        { type: "modelsBlock" },
        { type: "productionBlock" },
        { type: "accordionBlock" },
      ],
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
      name: "name",
      seoTitle: "seoTitle",
    },
    prepare({ name, seoTitle }) {
      return {
        title: name || seoTitle || "Hjem",
      };
    },
  },
});