import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "taking-my-soul-home",
  title: "Taking My Soul Home",
  projectId: "xq7lvf8y",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
