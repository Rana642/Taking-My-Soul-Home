import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
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
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "role", title: "Role", type: "string" },
        { name: "avatar", title: "Avatar", type: "image" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "isCornerstone",
      title: "Cornerstone Content?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", date: "publishedAt", media: "featuredImage" },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date?.split("T")[0],
        media,
      };
    },
  },
});
