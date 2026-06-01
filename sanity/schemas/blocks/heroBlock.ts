import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Hero",
      };
    },
  },
});
