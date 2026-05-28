import { defineType, defineField, ALL_FIELDS_GROUP } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "model",
  title: "Model",
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
      name: "meta",
      title: "Meta",
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
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: "general",
    }),
    defineField({
      name: "size",
      title: "Size (summary)",
      description: "Short size label used on model cards, e.g. “149 kvm”.",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "meta",
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "meta",
    }),
    defineField({
      name: "price",
      title: "Price",
      description: 'Shown on specifications, e.g. “00 000 kr” (prefix “Fra:” is added automatically).',
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "sizeBya",
      title: "Size BYA",
      description: 'Built-up area, e.g. “149 m2”.',
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "sizeBra",
      title: "Size BRA",
      description: 'Usable area, e.g. “156 m2”.',
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "rooms",
      title: "Rooms",
      description: 'Number of rooms, e.g. “3-5”.',
      type: "number",
      validation: (Rule) => Rule.required(),
      group: "meta",
    }),
    defineField({
      name: "floors",
      title: "Floors",
      description: 'Number of floors, e.g. “1-2”.',
      type: "number",
      validation: (Rule) => Rule.required(),
      group: "meta",
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      group: "meta",
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      group: "meta",
    }),
    defineField({
      name: "weight",
      title: "Weight",
      type: "number",
      group: "meta",
    }),
    defineField({
      name: "ceilingHeight",
      title: "Ceiling height",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "modules",
      title: "Modules",
      description: 'e.g. “3/4”.',
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      of: [
        { type: "specificationsBlock" },
        { type: "textBlock" },
        { type: "floorPlanBlock" },
        { type: "imageBlock" },
        { type: "imagesBlock" },
        { type: "carouselBlock" },
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
      subtitle: "description",
      media: "images.0.asset",
    },
  },
});