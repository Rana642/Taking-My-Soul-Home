import { DailyVerse, MerchItem } from '../types';

// NOTE: Series, Episodes, Blog posts, Audio tracks and Resources now come live
// from WordPress (see src/lib/wp.ts). What remains here is content that has no
// WordPress model yet: the rotating hero verses, the merch grid, and the
// team/initiative block.

export const DAILY_VERSES: DailyVerse[] = [
  {
    id: 'v1',
    type: 'verse',
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    transliteration: 'Ala bi-dhikr illahi tatma’innu al-qulub',
    translation: 'Verily, in the remembrance of Allah do hearts find peace.',
    reference: 'Surah Ar-Ra’d (13:28)',
    context: 'A comfort for souls seeking tranquil guidance in times of hardship and anxiety.'
  },
  {
    id: 'h1',
    type: 'hadith',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    transliteration: 'Innamal-a’malu bin-niyyat, wa innama likulli imri’in ma nawa',
    translation: 'Actions are judged by intentions, and every person will get what they intended.',
    reference: 'Sahih al-Bukhari 1',
    context: 'The foundational principle of sincerity (Ikhlas) in every action and endeavor.'
  },
  {
    id: 'v2',
    type: 'verse',
    arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
    transliteration: 'Wa idha sa’alaka ’ibadi ’anni fa-inni qarib, ujibu da’wat ad-da’i idha da’an',
    translation: 'And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
    reference: 'Surah Al-Baqarah (2:186)',
    context: 'A reminder that Allah is always listening to every heartfelt prayer.'
  },
  {
    id: 'h2',
    type: 'hadith',
    arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
    transliteration: 'Man salaka tariqan yaltamisu fihi ‘ilman sahhala-llahu lahu bihi tariqan ilal-jannah',
    translation: 'Whoever treads a path in search of knowledge, Allah will make easy for him the path to Paradise.',
    reference: 'Sahih Muslim 2699',
    context: 'Seeking spiritual wisdom and knowledge lightens our journey home.'
  },
  {
    id: 'v3',
    type: 'verse',
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    transliteration: 'Fa inna ma’al ‘usri yusra, Inna ma’al ‘usri yusra',
    translation: 'For indeed, with hardship comes ease. Indeed, with hardship comes ease.',
    reference: 'Surah Ash-Sharh (94:5-6)',
    context: 'An eternal promise that light always follows darkness.'
  }
];

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'm1',
    name: 'Taking My Soul Home Premium Linen Tote',
    price: '$24.00',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    description: 'Eco-friendly organic cotton tote embroidered with the iconic TMySH lotus crescent emblem.'
  },
  {
    id: 'm2',
    name: 'Serenity Zikr Prayer Beads (Olive Wood)',
    price: '$28.00',
    category: 'Spiritual Craft',
    image: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted 99-bead olive wood Tasbih sourced from sustainable groves.'
  },
  {
    id: 'm3',
    name: 'TMySH Minimalist Emerald Cap',
    price: '$22.00',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    description: 'Adjustable deep teal cap featuring high-density gold emblem stitching.'
  },
  {
    id: 'm4',
    name: 'Reflections & Tadabbur Hardcover Journal',
    price: '$19.00',
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: '180-page gilded journal designed for daily Qur’an notes, gratitude logging, and dua trackers.'
  }
];

export const TEAM_INFO = {
  initiativeBy: {
    title: 'An Initiative by',
    name: 'Freha Wahla',
    role: 'Founder & Writer',
    bio: 'All stories are written and narrated by Freha Wahla with the purpose of reviving hearts and drawing people closer to Allah and His Beloved ﷺ.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  executedBy: {
    title: 'Executed by',
    company: 'crea8ovia',
    description: 'All digital presence, content creation, video production, website development and marketing are managed by crea8ovia.',
    linkText: 'Visit: crea8ovia.com',
    linkUrl: 'https://crea8ovia.com',
    logoText: 'crea8ovia'
  },
  creativeDirection: {
    title: 'Creative Direction by',
    name: 'AALI JAH',
    role: 'Founder & Creative Director at crea8ovia',
    description: 'Working behind the scenes to bring this vision to life.',
    linkText: 'Visit: aalijah.com | @IamAaliJah',
    linkUrl: 'https://aalijah.com',
    socialHandle: '@IamAaliJah',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
};
