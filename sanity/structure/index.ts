import { StructureBuilder } from "sanity/structure";
import { HomeIcon, DocumentIcon, CogIcon, SquareIcon } from "@sanity/icons";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Home
      S.listItem()
        .title("Home")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("home")
            .documentId("home")
        ),
      // Pages
      S.listItem()
        .title("Pages")
        .icon(DocumentIcon)
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
      // Divider
      S.divider(),
      // Models (List)
      S.listItem()
        .title("Models")
        .icon(SquareIcon)
        .schemaType("model")
        .child(S.documentTypeList("model").title("Models")),
      // Divider
      S.divider(),
      // Settings (Singleton)
      S.listItem()
        .title("Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
        ),
    ]);