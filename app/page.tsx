import { HomePage } from '@/src/components/pages/HomePage';
import { getAllSeries, getAllEpisodes, getAllPosts, getAudioTracks } from '@/src/lib/wp';

export const revalidate = 300;

export default async function Page() {
  const [series, episodes, posts, tracks] = await Promise.all([
    getAllSeries(),
    getAllEpisodes(),
    getAllPosts(),
    getAudioTracks(),
  ]);

  return (
    <HomePage
      series={series}
      episodes={episodes.slice(0, 5)}
      posts={posts.slice(0, 5)}
      tracks={tracks}
    />
  );
}
