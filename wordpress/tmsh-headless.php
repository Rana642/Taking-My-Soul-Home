<?php
/**
 * Plugin Name:  TMSH Headless
 * Description:  Custom post types, taxonomies, and ACF fields for the "Taking My Soul Home"
 *               headless frontend. Everything is exposed to WPGraphQL so the Next.js app can
 *               query it. Field names match src/types.ts on the frontend.
 * Version:      0.1.0
 * Author:       crea8ovia
 * Requires PHP: 7.4
 *
 * REQUIRED PLUGINS (install + activate from wp-admin → Plugins → Add New):
 *   1. WPGraphQL                     (wpengine/wp-graphql)
 *   2. Advanced Custom Fields (ACF)  (free version is enough)
 *   3. WPGraphQL for ACF             (bridges ACF fields into GraphQL)
 *
 * Install: drop this file in wp-content/mu-plugins/ (auto-activates) OR
 *          wp-content/plugins/tmsh-headless/tmsh-headless.php and activate it.
 */

if (!defined('ABSPATH')) {
    exit;
}

/* ============================================================
 * 1. CUSTOM POST TYPES  (all show_in_graphql = true)
 * ============================================================ */
add_action('init', function () {

    // --- Series ---
    register_post_type('series', [
        'labels' => [
            'name'          => 'Series',
            'singular_name' => 'Series',
            'add_new_item'  => 'Add New Series',
            'edit_item'     => 'Edit Series',
        ],
        'public'              => true,
        'has_archive'         => true,
        'menu_icon'           => 'dashicons-video-alt3',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'],
        'rewrite'             => ['slug' => 'series'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'series',
        'graphql_plural_name' => 'allSeries', // "series" is same singular/plural, so plural must differ
    ]);

    // --- Episode ---
    register_post_type('episode', [
        'labels' => [
            'name'          => 'Episodes',
            'singular_name' => 'Episode',
            'add_new_item'  => 'Add New Episode',
            'edit_item'     => 'Edit Episode',
        ],
        'public'              => true,
        'has_archive'         => true,
        'menu_icon'           => 'dashicons-format-video',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'],
        'rewrite'             => ['slug' => 'episodes'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'episode',
        'graphql_plural_name' => 'episodes',
    ]);

    // --- Resource (PDF booklets, guides, downloads) ---
    register_post_type('resource', [
        'labels' => [
            'name'          => 'Resources',
            'singular_name' => 'Resource',
        ],
        'public'              => true,
        'has_archive'         => true,
        'menu_icon'           => 'dashicons-media-document',
        'supports'            => ['title', 'editor', 'thumbnail'],
        'rewrite'             => ['slug' => 'resources'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'resource',
        'graphql_plural_name' => 'resources',
    ]);

    // --- Audio Track (Darood / Wazifa / Kalam / Recitation) ---
    register_post_type('audio_track', [
        'labels' => [
            'name'          => 'Audio Tracks',
            'singular_name' => 'Audio Track',
        ],
        'public'              => true,
        'has_archive'         => true,
        'menu_icon'           => 'dashicons-format-audio',
        'supports'            => ['title', 'editor', 'thumbnail'],
        'rewrite'             => ['slug' => 'audio'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'audioTrack',
        'graphql_plural_name' => 'audioTracks',
    ]);

    /* --------------------------------------------------------
     * Taxonomies
     * ------------------------------------------------------ */

    // Series "tag" line (NAMES OF ALLAH, PROPHETIC TALES, ...) shared by series
    register_taxonomy('series_tag', ['series'], [
        'labels'            => ['name' => 'Series Tags', 'singular_name' => 'Series Tag'],
        'public'            => true,
        'hierarchical'      => false,
        'show_in_rest'      => true,
        'show_in_graphql'   => true,
        'graphql_single_name' => 'seriesTag',
        'graphql_plural_name' => 'seriesTags',
    ]);

    // Blog uses the built-in `post` type + built-in category/post_tag taxonomies,
    // which WPGraphQL already exposes. No extra CPT needed for the blog.
});

/* ============================================================
 * 2. ACF FIELD GROUPS  (registered in code = reproducible, no manual import)
 *    Every group + field sets show_in_graphql = 1 so WPGraphQL-for-ACF
 *    exposes them. Field names become camelCase in GraphQL.
 * ============================================================ */
add_action('acf/init', function () {

    if (!function_exists('acf_add_local_field_group')) {
        return; // ACF not active yet
    }

    /* ---------------- Series fields ---------------- */
    acf_add_local_field_group([
        'key'      => 'group_series',
        'title'    => 'Series Details',
        'show_in_graphql'      => 1,
        'graphql_field_name'   => 'seriesFields',
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'series']]],
        'fields'   => [
            ['key' => 'f_series_tagline',    'label' => 'Tagline',      'name' => 'tagline',    'type' => 'text',      'show_in_graphql' => 1],
            ['key' => 'f_series_featured',   'label' => 'Is Featured?', 'name' => 'isFeatured', 'type' => 'true_false', 'show_in_graphql' => 1],
            // description => post content/excerpt; thumbnail => featured image; tag => series_tag taxonomy
        ],
    ]);

    /* ---------------- Episode fields ---------------- */
    acf_add_local_field_group([
        'key'      => 'group_episode',
        'title'    => 'Episode Details',
        'show_in_graphql'    => 1,
        'graphql_field_name' => 'episodeFields',
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'episode']]],
        'fields'   => [
            ['key' => 'f_ep_series',     'label' => 'Series',          'name' => 'series',         'type' => 'post_object', 'post_type' => ['series'], 'return_format' => 'object', 'show_in_graphql' => 1],
            ['key' => 'f_ep_duration',   'label' => 'Duration (m:ss)', 'name' => 'duration',       'type' => 'text',        'show_in_graphql' => 1],
            ['key' => 'f_ep_youtube',    'label' => 'YouTube Embed ID','name' => 'youtubeEmbedId', 'type' => 'text',        'show_in_graphql' => 1],
            ['key' => 'f_ep_views',      'label' => 'Views',           'name' => 'views',          'type' => 'text',        'show_in_graphql' => 1],
            ['key' => 'f_ep_transcript', 'label' => 'Transcript',      'name' => 'transcript',     'type' => 'textarea',    'rows' => 8, 'show_in_graphql' => 1],
            ['key' => 'f_ep_takeaways',  'label' => 'Key Takeaways',   'name' => 'keyTakeaways',   'type' => 'repeater',    'show_in_graphql' => 1,
                'sub_fields' => [
                    ['key' => 'f_ep_takeaway', 'label' => 'Point', 'name' => 'point', 'type' => 'text', 'show_in_graphql' => 1],
                ],
            ],
            ['key' => 'f_ep_audio',      'label' => 'Audio Download',  'name' => 'audioDownloadUrl','type' => 'url', 'show_in_graphql' => 1],
            // title, excerpt (post excerpt), thumbnail (featured image), date (post date) come from core
        ],
    ]);

    /* ---------------- Resource fields ---------------- */
    acf_add_local_field_group([
        'key'      => 'group_resource',
        'title'    => 'Resource Details',
        'show_in_graphql'    => 1,
        'graphql_field_name' => 'resourceFields',
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'resource']]],
        'fields'   => [
            ['key' => 'f_res_type',     'label' => 'Type', 'name' => 'resourceType', 'type' => 'select', 'show_in_graphql' => 1,
                'choices' => ['audio' => 'audio', 'booklet' => 'booklet', 'pdf' => 'pdf'], 'default_value' => 'pdf'],
            ['key' => 'f_res_category', 'label' => 'Category',   'name' => 'category',    'type' => 'text', 'show_in_graphql' => 1],
            ['key' => 'f_res_size',     'label' => 'File Size',  'name' => 'fileSize',    'type' => 'text', 'show_in_graphql' => 1],
            ['key' => 'f_res_desc',     'label' => 'Description','name' => 'description',  'type' => 'textarea', 'show_in_graphql' => 1],
            ['key' => 'f_res_file',     'label' => 'Download',   'name' => 'downloadUrl',  'type' => 'url', 'show_in_graphql' => 1],
            // coverImage => featured image
        ],
    ]);

    /* ---------------- Audio Track fields ---------------- */
    acf_add_local_field_group([
        'key'      => 'group_audio',
        'title'    => 'Audio Track Details',
        'show_in_graphql'    => 1,
        'graphql_field_name' => 'audioFields',
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'audio_track']]],
        'fields'   => [
            ['key' => 'f_au_author',   'label' => 'Author/Reciter', 'name' => 'author',       'type' => 'text', 'show_in_graphql' => 1],
            ['key' => 'f_au_category', 'label' => 'Category', 'name' => 'audioCategory', 'type' => 'select', 'show_in_graphql' => 1,
                'choices' => ['Darood' => 'Darood', 'Wazifa' => 'Wazifa', 'Kalam' => 'Kalam', 'Recitation' => 'Recitation']],
            ['key' => 'f_au_duration', 'label' => 'Duration (m:ss)', 'name' => 'duration',   'type' => 'text', 'show_in_graphql' => 1],
            ['key' => 'f_au_url',      'label' => 'Audio File (MP3 URL)', 'name' => 'audioUrl', 'type' => 'url', 'instructions' => 'Upload the MP3 to WordPress Media Library and paste the direct URL here.', 'show_in_graphql' => 1],
            ['key' => 'f_au_desc',     'label' => 'Description',     'name' => 'description', 'type' => 'textarea', 'show_in_graphql' => 1],
            // coverImage => featured image
        ],
    ]);

    /* ---------------- Blog post extras (built-in `post`) ---------------- */
    acf_add_local_field_group([
        'key'      => 'group_post_extra',
        'title'    => 'Article Extras',
        'show_in_graphql'    => 1,
        'graphql_field_name' => 'articleFields',
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'post']]],
        'fields'   => [
            ['key' => 'f_post_readtime',   'label' => 'Read Time',     'name' => 'readTime',     'type' => 'text', 'show_in_graphql' => 1],
            ['key' => 'f_post_cornerstone','label' => 'Cornerstone?',  'name' => 'isCornerstone','type' => 'true_false', 'show_in_graphql' => 1],
        ],
    ]);
});
