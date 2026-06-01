import { ALL_FIELDS_GROUP, defineType, defineField } from "sanity";
import { BlockElementIcon, HomeIcon, EditIcon, SearchIcon } from "@sanity/icons";

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
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
      description: "Video shown at the top of the page.",
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
        { type: "valuesBlock" },
        { type: "modelsBlock" },
        { type: "productionBlock" },
        { type: "accordionBlock" },
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