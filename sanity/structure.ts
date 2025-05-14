// ./sanity/structure.ts

// import S from "@sanity/structure-builder";
import type { StructureResolver } from "sanity/desk"; // ✅ FIXED import

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Yurrp E-Commerce Website")
    .items([
      S.documentTypeListItem("category").title("Categories"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["post", "category"].includes(item.getId()!)
      ),
    ]);
