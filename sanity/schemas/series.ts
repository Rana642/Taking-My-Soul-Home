import { defineField, defineType } from "sanity";

export default defineType({
  name: "series",
  title: "Series",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tag",
      title: "Category Tag",
      type: "string",
      options: {
        list: [
          "Heart Reflections",
          "Prophetic Tales",
          "Names of Allah",
          "Weekly Wisdom",
          "Spiritual Warfare",
          "Daily Dua",
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", media: "thumbnail", tag: "tag" },
    prepare({ title, media, tag }) {
      return { title, subtitle: tag, media };
    },
  },
});
