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
