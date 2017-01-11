<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package boosterberg
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php if( get_post_meta( get_the_id(), 'enable_hero', true ) ) :

		$hero_title = get_post_meta( get_the_id(), 'hero_title', true );
		$hero_video = get_post_meta( get_the_id(), 'hero_video', true );
		$hero_content = get_post_meta( get_the_id(), 'hero_content', true );
		$hero_background_image = get_post_meta( get_the_id(), 'hero_background_image', true );

		?>
		<header class="hero">
			<div class="hero__video">
				<h1 class="hero__title"><?php echo $hero_title; ?></h1>
				<div class="hero__video-row">
					<div class="hero__animation-control">
						<div class="hero__video-toolbar">
							<span class="hero__video-toolbar__control"></span>
							<span class="hero__video-toolbar__control"></span>
							<span class="hero__video-toolbar__control"></span>
						</div>
						<div class="hero__video-wrap">
							<?php echo wp_oembed_get( $hero_video, array( 'width' => 560 ) ); ?>
						</div>
					</div>
				</div>
				<div class="hero__background">
				</div>
				<?php echo wp_get_attachment_image( $hero_background_image, 'full', false, array( 'class' => 'hero__background__image') ); ?>
			</div>

			<div class="hero__content">
				<?php echo apply_filters( 'the_content', $hero_content ); ?>
			</div>
		</header>
	<?php else : ?>
		<header class="page-header">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			<?php the_post_thumbnail( 'full', array( 'class' => 'entry-header__image') ); ?>
		</header><!-- .entry-header -->
	<?php endif; ?>

	<div class="entry-content">
		<div class="the-content <?php echo get_post_meta( get_the_id(), 'content_width', true ); ?>"><?php the_content(); ?></div>
		<?php
			boosterberg_page_builder();
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php
			edit_post_link(
				sprintf(
					/* translators: %s: Name of current post */
					esc_html__( 'Edit %s', 'boosterberg' ),
					the_title( '<span class="screen-reader-text">"', '"</span>', false )
				),
				'<span class="edit-link">',
				'</span>'
			);
		?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
