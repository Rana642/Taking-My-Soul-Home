<?php
/**
 * One-off seeder: fills the headless WordPress with the placeholder content
 * from wordpress/seed-data.json (the same data the frontend currently ships in
 * src/data/mockData.ts). Idempotent (upsert by slug) and re-runnable — images
 * are cached in an option so a timeout mid-run resumes cleanly.
 *
 * Fetched + eval'd by Novamira; function_exists guards make re-eval safe.
 */
if (!defined('ABSPATH')) { exit; }

if (!function_exists('tmsh_seed_data')) {
    function tmsh_seed_data() {
        static $d = null;
        if ($d !== null) { return $d; }
        $url = 'https://raw.githubusercontent.com/Rana642/Taking-My-Soul-Home/main/wordpress/seed-data.json';
        $resp = wp_remote_get($url, array('timeout' => 25));
        if (is_wp_error($resp)) { return null; }
        $d = json_decode(wp_remote_retrieve_body($resp), true);
        return $d;
    }
}

if (!function_exists('tmsh_seed_img')) {
    function tmsh_seed_img($url) {
        if (empty($url)) { return 0; }
        $cache = get_option('tmsh_seed_imgcache', array());
        if (isset($cache[$url])) { return intval($cache[$url]); }
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';
        $tmp = download_url($url, 25);
        if (is_wp_error($tmp)) { return 0; }
        $file = array('name' => 'tmsh-' . substr(md5($url), 0, 10) . '.jpg', 'tmp_name' => $tmp);
        $id = media_handle_sideload($file, 0);
        if (is_wp_error($id)) { if (file_exists($tmp)) { unlink($tmp); } return 0; }
        $cache[$url] = intval($id);
        update_option('tmsh_seed_imgcache', $cache, false);
        return intval($id);
    }
}

if (!function_exists('tmsh_seed_find')) {
    function tmsh_seed_find($type, $slug) {
        $q = new WP_Query(array('post_type' => $type, 'name' => $slug, 'posts_per_page' => 1, 'post_status' => 'any', 'no_found_rows' => true));
        return $q->have_posts() ? intval($q->posts[0]->ID) : 0;
    }
}

if (!function_exists('tmsh_seed_upsert')) {
    function tmsh_seed_upsert($type, $slug, $title, $content, $excerpt, $date) {
        $id = tmsh_seed_find($type, $slug);
        $args = array(
            'post_type' => $type, 'post_status' => 'publish', 'post_title' => $title,
            'post_name' => $slug, 'post_content' => $content, 'post_excerpt' => $excerpt,
        );
        if (!empty($date)) { $args['post_date'] = $date . ' 09:00:00'; }
        if ($id) { $args['ID'] = $id; wp_update_post($args); } else { $id = wp_insert_post($args); }
        return intval($id);
    }
}

if (!function_exists('tmsh_seed_all')) {
    function tmsh_seed_all() {
        $d = tmsh_seed_data();
        if (empty($d)) { return array('error' => 'could not fetch seed-data.json'); }

        // Author identity for blog posts.
        wp_update_user(array('ID' => 1, 'display_name' => 'Freha Wahla', 'first_name' => 'Freha', 'last_name' => 'Wahla'));

        $summary = array('series' => 0, 'episodes' => 0, 'posts' => 0, 'audio' => 0, 'resources' => 0);

        // --- Series ---
        foreach ($d['series'] as $s) {
            $id = tmsh_seed_upsert('series', $s['slug'], $s['title'], $s['description'], $s['tagline'], '');
            update_field('tagline', $s['tagline'], $id);
            update_field('isFeatured', (bool) $s['isFeatured'], $id);
            wp_set_object_terms($id, array($s['tag']), 'series_tag', false);
            $img = tmsh_seed_img($s['thumbnail']); if ($img) { set_post_thumbnail($id, $img); }
            $summary['series']++;
        }

        // --- Episodes (link to series by slug) ---
        foreach ($d['episodes'] as $e) {
            $id = tmsh_seed_upsert('episode', $e['slug'], $e['title'], '', $e['excerpt'], $e['date']);
            update_field('duration', $e['duration'], $id);
            update_field('youtubeEmbedId', $e['youtubeEmbedId'], $id);
            update_field('views', $e['views'], $id);
            update_field('transcript', $e['transcript'], $id);
            $sid = tmsh_seed_find('series', $e['seriesSlug']);
            if ($sid) { update_field('series', $sid, $id); }
            $img = tmsh_seed_img($e['thumbnail']); if ($img) { set_post_thumbnail($id, $img); }
            $summary['episodes']++;
        }

        // --- Blog posts ---
        foreach ($d['posts'] as $p) {
            $body = '<p>' . implode('</p><p>', array_map('esc_html', $p['content'])) . '</p>';
            $id = tmsh_seed_upsert('post', $p['slug'], $p['title'], $body, $p['excerpt'], $p['date']);
            wp_update_post(array('ID' => $id, 'post_author' => 1));
            wp_set_object_terms($id, array($p['category']), 'category', false);
            if (!empty($p['tags'])) { wp_set_object_terms($id, $p['tags'], 'post_tag', false); }
            update_field('readTime', $p['readTime'], $id);
            $img = tmsh_seed_img($p['featuredImage']); if ($img) { set_post_thumbnail($id, $img); }
            $summary['posts']++;
        }

        // --- Audio tracks ---
        foreach ($d['audio'] as $a) {
            $id = tmsh_seed_upsert('audio_track', $a['slug'], $a['title'], '', $a['description'], '');
            update_field('author', $a['author'], $id);
            update_field('audioCategory', $a['audioCategory'], $id);
            update_field('duration', $a['duration'], $id);
            update_field('audioUrl', $a['audioUrl'], $id);
            update_field('description', $a['description'], $id);
            $img = tmsh_seed_img($a['coverImage']); if ($img) { set_post_thumbnail($id, $img); }
            $summary['audio']++;
        }

        // --- Resources ---
        foreach ($d['resources'] as $r) {
            $id = tmsh_seed_upsert('resource', $r['slug'], $r['title'], '', $r['description'], '');
            update_field('resourceType', $r['resourceType'], $id);
            update_field('category', $r['category'], $id);
            update_field('fileSize', $r['fileSize'], $id);
            update_field('description', $r['description'], $id);
            $img = tmsh_seed_img($r['coverImage']); if ($img) { set_post_thumbnail($id, $img); }
            $summary['resources']++;
        }

        return $summary;
    }
}
