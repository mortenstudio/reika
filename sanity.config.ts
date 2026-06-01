import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { media, mediaAssetSource } from "sanity-plugin-media";

export default defineConfig({
  name: "reika",
  title: "Reika Studio",
  projectId: "ncguh1wb",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure,
      title: "Content",
    }),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (templateItem) =>
          templateItem.templateId === "page" || templateItem.templateId === "model"
      ),
  },
});
