import { defineType, defineField } from "sanity";

export default defineType({
  name: "textBlock",
  title: "Text",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      heading: "heading",
      body: "body",
    },
    prepare({ title, heading, body }) {
      const plain =
        Array.isArray(body) &&
        body
          .filter((block) => block._type === "block")
          .map((block) =>
            block.children
              ?.filter((child: { _type?: string }) => child._type === "span")
              .map((span: { text?: string }) => span.text)
              .join("")
          )
          .join(" ");

      return {
        title: title || heading || "Text",
        subtitle: plain ? `${plain.substring(0, 50)}...` : "",
      };
    },
  },
});
