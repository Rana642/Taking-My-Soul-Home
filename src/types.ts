export interface DailyVerse {
  id: string;
  type: 'verse' | 'hadith';
  arabic: string;
  translation: string;
  transliteration?: string;
  reference: string;
  context?: string;
  dateStr?: string;
}

export interface SeriesItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  episodeCount: number;
  tag: string;
  isFeatured?: boolean;
}

export interface EpisodeItem {
  id: string;
  slug: string;
  seriesId: string;
  seriesSlug: string;
  seriesTitle: string;
  title: string;
  excerpt: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  youtubeEmbedId?: string;
  date: string;
  views?: string;
  transcript?: string;
  keyTakeaways?: string[];
  audioDownloadUrl?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  author: string;
  category: 'Darood' | 'Wazifa' | 'Kalam' | 'Recitation';
  duration: string;
  audioUrl: string;
  description: string;
  coverImage?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tag: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  excerpt: string;
  /** Rendered HTML from WordPress (was string[] of paragraphs under mockData). */
  content: string;
  featuredImage: string;
  tags: string[];
  isCornerstone?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'audio' | 'booklet' | 'pdf';
  category: string;
  size?: string;
  description: string;
  downloadUrl?: string;
  coverImage?: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
}
