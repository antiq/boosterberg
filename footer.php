<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package boosterberg
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="footer-widgets">
			<?php dynamic_sidebar( 'footer' ); ?>
		</div>
		<div class="site-info">
			&copy; Boosterberg.com 2016<span class="sep"> | </span>Developed by PS:Digital & Kremsa Digital.
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
