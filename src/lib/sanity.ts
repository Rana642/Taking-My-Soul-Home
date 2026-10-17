import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "xq7lvf8y",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function getAllSeries() {
  return sanity.fetch(
    `*[_type == "series"] | order(order asc) {
      "id": _id,
      title,
      "slug": slug.current,
      tagline,
      description,
      tag,
      isFeatured,
      order,
      "thumbnail": thumbnail.asset->url,
      "episodeCount": count(*[_type == "episode" && references(^._id)])
    }`
  );
}

export async function getSeriesBySlug(slug: string) {
  return sanity.fetch(
    `*[_type == "series" && slug.current == $slug][0] {
      "id": _id,
      title,
      "slug": slug.current,
      tagline,
      description,
      tag,
      isFeatured,
      "thumbnail": thumbnail.asset->url,
      "episodeCount": count(*[_type == "episode" && references(^._id)])
    }`,
    { slug }
  );
}

export async function getEpisodesBySeries(seriesId: string) {
  return sanity.fetch(
    `*[_type == "episode" && series._ref == $seriesId] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      duration,
      "thumbnail": thumbnail.asset->url,
      videoUrl,
      youtubeEmbedId,
      instagramPermalink,
      instagramMediaType,
      "date": publishedAt,
      hashtags,
      "seriesId": series->_id,
      "seriesTitle": series->title,
      "seriesSlug": series->slug.current
    }`,
    { seriesId }
  );
}

export async function getAllEpisodes(limit = 100) {
  return sanity.fetch(
    `*[_type == "episode"] | order(publishedAt desc) [0...$limit] {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      duration,
      "thumbnail": thumbnail.asset->url,
      videoUrl,
      youtubeEmbedId,
      instagramPermalink,
      instagramMediaType,
      "date": publishedAt,
      hashtags,
      "seriesId": series->_id,
      "seriesTitle": series->title,
      "seriesSlug": series->slug.current
    }`,
    { limit }
  );
}

export async function getEpisodeBySlug(slug: string) {
  return sanity.fetch(
    `*[_type == "episode" && slug.current == $slug][0] {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      duration,
      "thumbnail": thumbnail.asset->url,
      videoUrl,
      youtubeEmbedId,
      instagramPermalink,
      instagramMediaType,
      instagramId,
      "date": publishedAt,
      transcript,
      keyTakeaways,
      audioDownloadUrl,
      hashtags,
      "seriesId": series->_id,
      "seriesTitle": series->title,
      "seriesSlug": series->slug.current
    }`,
    { slug }
  );
}

export async function getAllPosts() {
  return sanity.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      category,
      tag,
      author,
      "date": publishedAt,
      readTime,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      tags,
      isCornerstone
    }`
  );
}

export async function getPostBySlug(slug: string) {
  return sanity.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      "id": _id,
      title,
      "slug": slug.current,
      category,
      tag,
      author,
      "date": publishedAt,
      readTime,
      excerpt,
      content,
      "featuredImage": featuredImage.asset->url,
      tags,
      isCornerstone
    }`,
    { slug }
  );
}

export async function getAudioTracks() {
  return sanity.fetch(
    `*[_type == "audioTrack"] {
      "id": _id,
      title,
      author,
      category,
      duration,
      "audioUrl": coalesce(audioFile.asset->url, audioUrl),
      description,
      "coverImage": coverImage.asset->url
    }`
  );
}

export async function getDailyVerses() {
  return sanity.fetch(
    `*[_type == "dailyVerse"] {
      "id": _id,
      type,
      arabic,
      transliteration,
      translation,
      reference,
      context
    }`
  );
}

export async function getResources() {
  return [] as any[];
}

export function getRelatedEpisodes(episode: any, allEpisodes: any[]) {
  return allEpisodes
    .filter((ep: any) => ep.id !== episode.id && ep.seriesId === episode.seriesId)
    .slice(0, 4);
}
