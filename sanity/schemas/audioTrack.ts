import { defineField, defineType } from "sanity";

export default defineType({
  name: "audioTrack",
  title: "Audio Track",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Darood", "Wazifa", "Kalam", "Recitation"],
      },
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "audioFile",
      title: "Audio File",
      type: "file",
      options: { accept: "audio/*" },
    }),
    defineField({
      name: "audioUrl",
      title: "External Audio URL",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", category: "category", media: "coverImage" },
    prepare({ title, category, media }) {
      return { title, subtitle: category, media };
    },
  },
});
