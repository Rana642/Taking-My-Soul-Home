import { defineField, defineType } from "sanity";

export default defineType({
  name: "dailyVerse",
  title: "Daily Verse / Hadith",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["verse", "hadith"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "arabic",
      title: "Arabic Text",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "transliteration",
      title: "Transliteration",
      type: "string",
    }),
    defineField({
      name: "translation",
      title: "Translation",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "translation", type: "type", ref: "reference" },
    prepare({ title, type, ref }) {
      return {
        title: title?.slice(0, 60) + "…",
        subtitle: `${type === "verse" ? "Quran" : "Hadith"} — ${ref}`,
      };
    },
  },
});
