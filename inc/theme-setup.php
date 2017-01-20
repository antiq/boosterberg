<?php

if ( ! function_exists( 'boosterberg_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function boosterberg_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on boosterberg, use a find and replace
	 * to change 'boosterberg' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'boosterberg', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'boosterberg' ),
		'top' => esc_html__( 'Top bar', 'boosterberg' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom logo feature.
	add_theme_support( 'custom-logo' );

	// Editor style for nice typography in admin
	if ( WP_DEBUG ) {
		add_editor_style( get_template_directory_uri() . '/dist/css/editor-style.css' );
	} else {
		add_editor_style( get_template_directory_uri() . '/dist/css/editor-style.min.css' );
	}
}
endif; // boosterberg_setup
add_action( 'after_setup_theme', 'boosterberg_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function boosterberg_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'boosterberg_content_width', 640 );
}
add_action( 'after_setup_theme', 'boosterberg_content_width', 0 );

function boosterberg_excerpt_length( $length ) {
	return 75;
}
add_filter( 'excerpt_length', 'boosterberg_excerpt_length', 999 );

/**
* Filter the "read more" excerpt string link to the post.
*
* @param string $more "Read more" excerpt string.
* @return string modified "read more" excerpt string.
*/
function boosterberg_excerpt_more( $more ) {
   return sprintf( '...&nbsp;  <a class="read-more" href="%1$s">%2$s</a>',
       get_permalink( get_the_ID() ),
       __( 'Read More', 'boosterberg' )
   );
}
add_filter( 'excerpt_more', 'boosterberg_excerpt_more' );
