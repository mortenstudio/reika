import { defineType, defineField, ALL_FIELDS_GROUP } from "sanity";
import { BlockElementIcon, DocumentIcon, EditIcon, SearchIcon, TagIcon, CopyIcon } from "@sanity/icons";
import { SuffixInput } from '../../components/SuffixInput';

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
      icon: EditIcon,
      default: true,
    },
    {
      name: "meta",
      title: "Meta",
      icon: TagIcon,
    },
    {
      name: "types",
      title: "Types",
      icon: CopyIcon,
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
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Short summary of the model shown in cards and listings.",
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description: "Gallery images for the model. The first image is used as the main thumbnail.",
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
      name: "sizeBya",
      title: "Size BYA",
      type: "string",
      description: "Gross floor area (bruksareal) in square metres.",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'kvm'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "sizeBra",
      title: "Size BRA",
      type: "string",
      description: "Usable floor area (bruttoareal) in square metres.",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'kvm'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "string",
      description: "Maximum number of people the model accommodates.",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'people'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "Starting price in Norwegian kroner.",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'NOK'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "rooms",
      title: "Rooms",
      description: 'Number of rooms, e.g. “3-5”.',
      type: "string",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'rooms'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "floors",
      title: "Floors",
      description: 'Number of floors, e.g. “1-2”.',
      type: "string",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'floors'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "string",
      description: "Number of bedrooms available in this model.",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'bedrooms'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "string",
      description: "Number of bathrooms available in this model.",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'bathrooms'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "weight",
      title: "Weight",
      type: "string",
      description: "Total weight of the model in kilograms.",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'kg'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "ceilingHeight",
      title: "Ceiling height",
      type: "string",
      description: "Internal ceiling height in metres.",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'meter'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "modules",
      title: "Modules",
      description: 'e.g. “3/4”.',
      type: "string",
      components: {
        input: SuffixInput
      },
      options: {
        suffix: 'modules'
      } as any,
      group: "meta",
    }),
    defineField({
      name: "types",
      title: "Types",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: {
            select: {
              name: "name",
              media: "image",
            },
            prepare({ name, media }) {
              return {
                title: name,
                media,
              };
            },
          },
        },
      ],
      group: "types",
    }),
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      description: "Modular content sections that make up the page body.",
      of: [
        { type: "specificationsBlock" },
        { type: "textBlock" },
        { type: "floorPlanBlock" },
        { type: "imageBlock" },
        { type: "imagesBlock" },
        { type: "carouselBlock" },
        { type: "cardsBlock" },
        { type: "intTypeBlock" },
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
      subtitle: "description",
      media: "images.0.asset",
    },
  },
});