<?php

/**
 * Remove unnecessary buttons from TinyMCE
 * @param array
 * @return array
 */
function boosterberg_remove_mce_buttons( $buttons ) {
	$remove = array( 'wp_more' );
	foreach( $remove as $rem ) {
		if ( in_array( $rem, $buttons ) )
			unset( $buttons[ array_search( $rem, $buttons ) ] );
	}
	return $buttons;
}
add_filter( 'mce_buttons', 'boosterberg_remove_mce_buttons' );

/**
 * Remove unnecessary buttons from TinyMCE
 * @param array
 * @return array
 */
function boosterberg_remove_mce_2_buttons( $buttons ) {
	$remove = array( );
	foreach( $remove as $rem ) {
		if ( in_array( $rem, $buttons ) )
			unset( $buttons[ array_search( $rem, $buttons ) ] );
	}
	return $buttons;
}
add_filter( 'mce_buttons_2', 'boosterberg_remove_mce_2_buttons' );


/**
 * Add styleselect dropdown to TinyMCE
 * @param array
 * @return array
 */
add_filter( 'mce_buttons_2', 'boosterberg_buttons_2' );
function boosterberg_buttons_2( $buttons ) {
	array_unshift( $buttons, 'styleselect' );
	return $buttons;
}

/**
 * Add options to styleselect dropdown
 * @param array
 * @return array
 * see https://codex.wordpress.org/TinyMCE_Custom_Styles
 */
add_filter( 'tiny_mce_before_init', 'boosterberg_before_init' );
function boosterberg_before_init( $settings ) {

	$style_formats = array(
		array(
			'title' => __( 'Button', 'trisomytest' ),
			'selector' => 'a',
			'classes' => 'button',
			),
		array(
			'title' => __( 'Hollow button', 'trisomytest' ),
			'selector' => 'a',
			'classes' => 'button hollow',
			),
		array(
			'title' => __( 'Secondary button', 'trisomytest' ),
			'selector' => 'a',
			'classes' => 'button secondary',
			),

	);

	$settings['style_formats'] = json_encode( $style_formats );

	return $settings;

}
