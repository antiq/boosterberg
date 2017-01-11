<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package boosterberg
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' ); ?>
	</header><!-- .entry-header -->

	<?php if ( 'post' === get_post_type() ) : ?>
	<div class="entry-meta">
		<?php boosterberg_posted_on(); ?>
	</div><!-- .entry-meta -->
	<?php endif; ?>

	<div class="entry-content">
		<div class="excerpt">
			<?php the_excerpt(); ?>
		</div>
		<?php echo has_post_thumbnail() ? '<div class="thumbnail">' . get_the_post_thumbnail() . '</div>': ''; ?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php boosterberg_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
