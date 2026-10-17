import { defineField, defineType } from "sanity";

export default defineType({
  name: "episode",
  title: "Episode",
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
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "series" }],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "videoUrl",
      title: "Direct Video URL",
      type: "url",
    }),
    defineField({
      name: "youtubeEmbedId",
      title: "YouTube Embed ID",
      type: "string",
    }),
    defineField({
      name: "instagramPermalink",
      title: "Instagram Permalink",
      type: "url",
    }),
    defineField({
      name: "instagramMediaType",
      title: "Instagram Media Type",
      type: "string",
      options: { list: ["IMAGE", "VIDEO", "CAROUSEL_ALBUM"] },
      hidden: ({ document }) => !document?.instagramPermalink,
    }),
    defineField({
      name: "instagramId",
      title: "Instagram Post ID",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key Takeaways",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "audioDownloadUrl",
      title: "Audio Download URL",
      type: "url",
    }),
    defineField({
      name: "hashtags",
      title: "Hashtags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      series: "series.title",
      date: "publishedAt",
      media: "thumbnail",
    },
    prepare({ title, series, date, media }) {
      return {
        title,
        subtitle: [series, date?.split("T")[0]].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
