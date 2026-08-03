import { DailyVerse, SeriesItem, EpisodeItem, AudioTrack, BlogPost, ResourceItem, MerchItem } from '../types';

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

export const FEATURED_SERIES: SeriesItem[] = [
  {
    id: 's1',
    title: 'Merciful Shades of the Beloved',
    tagline: 'Exploring the Beautiful Names of Allah',
    description: 'A cinematic journey exploring the divine attributes, names, and mercy of Allah SWT in everyday human life.',
    thumbnail: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    episodeCount: 12,
    tag: 'NAMES OF ALLAH',
    isFeatured: true
  },
  {
    id: 's2',
    title: "Let's Tell Allah",
    tagline: 'Talk to Allah from the Heart',
    description: 'Intimate conversations and heartfelt supplications designed to strengthen your personal connection with the Creator.',
    thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    episodeCount: 8,
    tag: 'HEART REFLECTIONS',
    isFeatured: true
  },
  {
    id: 's3',
    title: 'A Breath of Compassion',
    tagline: 'Stories That Inspire the Soul',
    description: 'Cinematic storytelling highlighting compassion, forgiveness, and light in classical prophetic narratives.',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    episodeCount: 15,
    tag: 'PROPHETIC TALES',
    isFeatured: true
  },
  {
    id: 's4',
    title: "Jumu'ah Reminder",
    tagline: 'Weekly Reminders for a Better Friday',
    description: 'Short spiritual boosters and blessings of Salawat for starting Friday with clarity and peace.',
    thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    episodeCount: 24,
    tag: 'WEEKLY WISDOM',
    isFeatured: true
  },
  {
    id: 's5',
    title: 'Two Wise Inside: Soul vs. Ego',
    tagline: 'The Inner Battle We All Face',
    description: 'Understanding Tazkiyah (purification of the soul), overcoming the Nafs, and finding spiritual harmony.',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    episodeCount: 10,
    tag: 'SPIRITUAL WARFARE',
    isFeatured: true
  },
  {
    id: 's6',
    title: 'And Many More...',
    tagline: 'New Series Coming Soon',
    description: 'Discover upcoming docuseries and storytelling audio tracks produced by TMySH.',
    thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    episodeCount: 0,
    tag: 'STAY TUNED',
    isFeatured: false
  }
];

export const LATEST_EPISODES: EpisodeItem[] = [
  {
    id: 'ep1',
    seriesId: 's3',
    seriesTitle: 'A Breath of Compassion',
    title: 'Maryam & the Miracle of Isa',
    excerpt: 'A story of purity, steadfastness, and divine support in times of complete solitude.',
    duration: '8:45',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    youtubeEmbedId: 'dGcsHMXbSOA',
    date: 'May 18, 2024',
    views: '14.2K',
    transcript: `In the quiet solitude of her sanctuary, Sayyidatina Maryam (peace be upon her) faced a trial that tested every fiber of human endurance. Yet her trust in Allah was unbroken. When Allah commands an outcome, no worldly hardship can withstand His decree. Through her story, we learn that divine help arrives precisely at the moment of utmost need.`
  },
  {
    id: 'ep2',
    seriesId: 's3',
    seriesTitle: 'A Breath of Compassion',
    title: 'Musa & the Sea That Split',
    excerpt: 'When Allah opens the impossible path in front of you when all doors appear closed.',
    duration: '7:12',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    youtubeEmbedId: 'dQw4w9WgXcQ',
    date: 'May 14, 2024',
    views: '22.8K',
    transcript: `Standing before the roaring sea with the army of Pharaoh closing in behind, the followers of Musa exclaimed: 'We are surely overtaken!' But Musa replied with conviction: 'No! Indeed, with me is my Lord; He will guide me.' Belief splits seas of sorrow.`
  },
  {
    id: 'ep3',
    seriesId: 's1',
    seriesTitle: 'Merciful Shades of the Beloved',
    title: 'Ibrahim & the Fire That Cooled',
    excerpt: 'Faith that turns trials into miracles and blazing fires into gardens of tranquility.',
    duration: '7:56',
    thumbnail: 'https://images.unsplash.com/photo-1516298281804-ed168fce1878?auto=format&fit=crop&w=800&q=80',
    youtubeEmbedId: 'C0DPdy98e4c',
    date: 'May 10, 2024',
    views: '18.5K',
    transcript: `Prophet Ibrahim (AS) surrendered completely to the decree of Allah. As he was catapulted into the inferno, his last words were: 'Hasbunallah wa ni'mal wakeel' - Allah is sufficient for us. Allah commanded the fire: 'O fire, be cool and peaceful upon Ibrahim.'`
  },
  {
    id: 'ep4',
    seriesId: 's5',
    seriesTitle: 'Two Wise Inside: Soul vs. Ego',
    title: 'Ayyub & the Healing After Pain',
    excerpt: 'Patience that brings healing and the beauty of calling upon Allah in deep gratitude.',
    duration: '9:30',
    thumbnail: 'https://images.unsplash.com/photo-1509021436468-d51039746b20?auto=format&fit=crop&w=800&q=80',
    youtubeEmbedId: 'fJ9rUzIMcZQ',
    date: 'May 06, 2024',
    views: '11.9K',
    transcript: `For years, Prophet Ayyub (AS) endured physical hardship and loss without a word of complaint. When he finally prayed, he spoke with utter elegance: 'Adversity has touched me, and You are the Most Merciful of the merciful.' Divine restoration followed.`
  },
  {
    id: 'ep5',
    seriesId: 's3',
    seriesTitle: 'A Breath of Compassion',
    title: 'Abu Bakr & the Cave of Trust',
    excerpt: 'The power of unshakeable trust during the Hijrah in the Cave of Thawr.',
    duration: '6:50',
    thumbnail: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    youtubeEmbedId: '3JZ_D3ELwOQ',
    date: 'May 02, 2024',
    views: '29.1K',
    transcript: `In the small cave of Thawr, surrounded by hostile trackers, Abu Bakr (RA) worried for the Prophet (ﷺ). The Prophet turned to him with serene composure and whispered: 'Do not grieve; indeed Allah is with us.'`
  }
];

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'a1',
    title: 'Darood e Ibrahim',
    author: 'Recited by Freha Wahla',
    category: 'Darood',
    duration: '4:15',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8230f2d.mp3?filename=meditation-relaxing-12028.mp3',
    description: 'A soothing recitation of Darood e Ibrahim bringing peace and invoking blessings upon Prophet Muhammad ﷺ.',
    coverImage: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'a2',
    title: 'Darood e Pak',
    author: 'Recited by Freha Wahla',
    category: 'Darood',
    duration: '3:40',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-ambient-111154.mp3',
    description: 'Atmospheric audio invocation created for quiet morning remembrance and spiritual focus.',
    coverImage: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'a3',
    title: 'Wazifa: Peace of Heart',
    author: 'Narrated by Freha Wahla',
    category: 'Wazifa',
    duration: '6:10',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-10781.mp3',
    description: 'A guided remembrance track focusing on surrendering anxiety to Allah through sacred Zikr.',
    coverImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'a4',
    title: 'Kalam: Main Banda e Aasi Hoon',
    author: 'Recited by Freha Wahla',
    category: 'Kalam',
    duration: '5:25',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_883353ef82.mp3?filename=calm-meditation-instrumental-7481.mp3',
    description: 'Heartfelt Sufi poetry seeking forgiveness, repentance, and divine elevation.',
    coverImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=400&q=80'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Build a Deep Connection with Allah',
    slug: 'build-deep-connection-with-allah',
    category: 'Spiritual Growth',
    tag: 'TAFSEER',
    author: {
      name: 'Freha Wahla',
      role: 'Founder & Writer'
    },
    date: 'May 12, 2024',
    readTime: '5 min read',
    excerpt: 'Practical steps to strengthen your relationship with your Creator through mindful Salah, daily Zikr, and sincere Dua.',
    content: [
      `Connecting deeply with Allah is not an overnight attainment; it is an ongoing journey of turning your heart toward Him in every condition—both in joy and in vulnerability.`,
      `The first anchor of this bond is Salah performed with Khushu' (mindful devotion). When we step onto the prayer mat, we step out of the relentless noise of the worldly life and stand directly before the Lord of the worlds.`,
      `Secondly, maintaining a soft tongue with constant Dhikr (remembrance) acts as a polish for the heart. Repeating simple phrases like 'SubhanAllah', 'Alhamdulillah', and 'Astaghfirullah' transforms mundane tasks into acts of worship.`,
      `Finally, speak to Allah in your own language. Intimate Dua is the conversation of the soul. Tell Him your fears, your hopes, and your tears. He is closer to us than our jugular vein.`
    ],
    featuredImage: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    tags: ['Salah', 'Dua', 'Mindfulness', 'Spirituality']
  },
  {
    id: 'b2',
    title: 'Lessons from the Lives of the Prophets',
    slug: 'lessons-from-lives-of-the-prophets',
    category: 'Stories',
    tag: 'STORIES',
    author: {
      name: 'Freha Wahla',
      role: 'Founder & Writer'
    },
    date: 'May 10, 2024',
    readTime: '7 min read',
    excerpt: 'Timeless lessons that guide our daily lives, extracted from the trials and victories of Islamic history.',
    content: [
      `The Quran is filled with stories not merely for historical curiosity, but as living blueprints for human resilience and faith.`,
      `From Prophet Yusuf (AS), we learn that betrayal and imprisonment can be the unexpected doorways to ultimate purpose when paired with trust and moral integrity.`,
      `From Prophet Ayub (AS), we learn that patience (Sabr) is not passive tolerance, but active gratitude despite overwhelming pain.`,
      `By reflecting deeply upon these narratives, our personal struggles begin to sit within a grander, reassuring divine framework.`
    ],
    featuredImage: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    tags: ['Prophets', 'Sabr', 'Quranic Stories']
  },
  {
    id: 'b3',
    title: 'The Power of Istighfar in Difficult Times',
    slug: 'power-of-istighfar-in-difficult-times',
    category: 'Reminders',
    tag: 'REMINDERS',
    author: {
      name: 'Freha Wahla',
      role: 'Founder & Writer'
    },
    date: 'May 8, 2024',
    readTime: '6 min read',
    excerpt: 'How seeking forgiveness opens closed doors, brings unforeseen sustenance, and cleanses spiritual heaviness.',
    content: [
      `Istighfar is frequently understood solely as an apology for mistakes, but in Islam, it is also a key that unlocks mercy, provision, and mental clarity.`,
      `Prophet Nuh (AS) reminded his people: 'Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver. He will send rain upon you in abundance and give you wealth and children.'`,
      `When anxiety clouds your vision, abundant Istighfar lifts spiritual blockages and restores serenity to the chest.`
    ],
    featuredImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    tags: ['Istighfar', 'Forgiveness', 'Peace']
  },
  {
    id: 'b4',
    title: 'Increase Your Love for the Qur’an',
    slug: 'increase-your-love-for-quran',
    category: 'Quran Reflections',
    tag: 'QURAN REFLECTIONS',
    author: {
      name: 'Freha Wahla',
      role: 'Founder & Writer'
    },
    date: 'May 6, 2024',
    readTime: '4 min read',
    excerpt: 'Simple ways to build a loving, consistent, and transformative daily relationship with the Word of Allah.',
    content: [
      `Falling in love with the Qur'an starts with small, consistent steps rather than daunting targets.`,
      `Read a single page daily with translation and Tadabbur (contemplation). Ask yourself: 'What is Allah communicating directly to me in this verse?'`,
      `Listen to soothing recitations during commutes and let the rhythm of the divine text soften the heart.`
    ],
    featuredImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    tags: ['Quran', 'Tadabbur', 'Daily Routine']
  },
  {
    id: 'b5',
    title: 'Gratitude: The Key to Inner Peace',
    slug: 'gratitude-key-to-inner-peace',
    category: 'Spiritual Growth',
    tag: 'SPIRITUAL GROWTH',
    author: {
      name: 'Freha Wahla',
      role: 'Founder & Writer'
    },
    date: 'May 4, 2024',
    readTime: '4 min read',
    excerpt: 'Why gratitude brings contentment and blessings into our everyday lived experiences.',
    content: [
      `Allah states in the Qur'an: 'If you are grateful, I will surely increase you in favor.'`,
      `Practicing Shukr (gratitude) shifts our focus from what is lacking to the infinite blessings that surround us every moment—from breath and health to safety and love.`
    ],
    featuredImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    tags: ['Shukr', 'Gratitude', 'Peace']
  }
];

export const RESOURCES: ResourceItem[] = [
  {
    id: 'r1',
    title: '30 Daily Supplications (Du\'a Booklet)',
    type: 'pdf',
    category: 'Booklets & Guides',
    size: '4.2 MB',
    description: 'A beautifully formatted downloadable PDF containing authentic morning and evening supplications with English transliteration.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'r2',
    title: 'Ultimate Guide to Zikr & Tazkiyah',
    type: 'pdf',
    category: 'E-Books',
    size: '8.1 MB',
    description: 'A comprehensive handbook exploring spiritual purification, overcoming ego, and establishing a structured Zikr habit.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'r3',
    title: 'Darood e Pak Audio Companion',
    type: 'audio',
    category: 'Audio Downloads',
    size: '12 MB',
    description: 'High-quality MP3 collection of recited Salawat for meditation and offline listening.',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80'
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
