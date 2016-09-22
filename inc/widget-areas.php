<?php
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function boosterberg_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Footer widgets', 'boosterberg' ),
		'id'            => 'footer',
		'description'   => '',
		'before_widget' => '<div id="%1$s" class="widget footer-widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="footer-widget__title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'boosterberg_widgets_init' );
