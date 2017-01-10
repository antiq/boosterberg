<?php
/**
 * boosterberg functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package boosterberg
 */


/**
 * Setup theme.
 */
require get_template_directory() . '/inc/theme-setup.php';

/**
 * Load css and js.
 */
require get_template_directory() . '/inc/assets.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/page-builder.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Tiny mce settings and extensions.
 */
require get_template_directory() . '/inc/tinymce.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Widget areas.
 */
require get_template_directory() . '/inc/widget-areas.php';

/* Add youtube hero video url params */
add_filter('oembed_result', 'hero_oembed', 10, 3);
function hero_oembed($html, $url, $args)
{
  return str_replace('?feature=oembed', '?feature=oembed&rel=0&showinfo=0&iv_load_policy=3', $html);
}

/* Facebook into menu integration */
add_filter( 'wp_nav_menu_items', 'add_facebook_button_nav_menu', 10, 2 );

function add_facebook_button_nav_menu( $menu, stdClass $args ){
	if ( 'top' != $args->theme_location )
	return $menu;
	$menu .= sprintf( '<li style="margin-left:12px;position:relative;top:1px;" class="fb-like" data-href="http://boosterberg.com" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true" data-colorscheme="dark"></li>' );
	return $menu;
}