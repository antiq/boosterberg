<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package boosterberg
 */

if ( ! function_exists( 'boosterberg_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function boosterberg_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = sprintf(
		esc_html_x( 'Posted on %s', 'post date', 'boosterberg' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);

	$categories_list = get_the_category_list( esc_html__( ', ', 'boosterberg' ) );


	$out = '<span class="posted-on">' . $posted_on . '</span>';
	$out .= $categories_list && boosterberg_categorized_blog() && is_singular() ? sprintf( '<span class="cat-links"> ' . esc_html__( 'under %1$s', 'boosterberg' ) . '</span>', $categories_list ) : ''; // WPCS: XSS OK.;

	echo $out; // WPCS: XSS OK.

}
endif;

if ( ! function_exists( 'boosterberg_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function boosterberg_entry_footer() {
	// Hide category and tag text for pages.
	if ( 'post' === get_post_type() && is_singular() ) {

		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', esc_html__( ', ', 'boosterberg' ) );
		if ( $tags_list ) {
			printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'boosterberg' ) . '</span>', $tags_list ); // WPCS: XSS OK.
		}
	}

}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function boosterberg_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'boosterberg_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,
			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'boosterberg_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so boosterberg_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so boosterberg_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in boosterberg_categorized_blog.
 */
function boosterberg_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'boosterberg_categories' );
}
add_action( 'edit_category', 'boosterberg_category_transient_flusher' );
add_action( 'save_post',     'boosterberg_category_transient_flusher' );

/**
 * Get custom logo markup from customizer.
 */
function boosterberg_get_custom_logo() {
	$html = '';

	$custom_logo_id = get_theme_mod( 'custom_logo' );

	// We have a logo. Logo is go.
	if ( $custom_logo_id ) {
		$html = wp_get_attachment_image( $custom_logo_id, 'full', false, array(
				'class'    => 'custom-logo',
				'itemprop' => 'logo',
				) );
	}

	return $html;
}
