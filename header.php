<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package boosterberg
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,500" rel="stylesheet">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'boosterberg' ); ?></a>
	<div class="sticky-header">
		<?php wp_nav_menu( array( 'theme_location' => 'top', 'menu_id' => 'top-menu', 'menu_class' => 'menu menu--top', 'depth' => 1, 'fallback_cb' => false ) ); ?>
		<header id="masthead" class="site-header" role="banner">
			<div class="site-branding">
				<?php
					if ( has_custom_logo() ) {
						$site_title = boosterberg_get_custom_logo();
					} else {
						$site_title = get_bloginfo( 'name' );
					}

					$home_url = esc_url( home_url( '/' ) );

					if ( is_front_page() && is_home() ) : ?>
						<h1 class="site-title"><a href="<?php echo $home_url; ?>" rel="home"><?php echo $site_title; ?></a></h1>
					<?php else : ?>
						<p class="site-title"><a href="<?php echo $home_url; ?>" rel="home"><?php echo $site_title; ?></a></p>
					<?php
					endif;
					?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation" role="navigation">
				<button id="primary-menu-toggle" class="menu-toggle" aria-controls="primary-menu-wrap" aria-expanded="false" data-toggle="primary-menu-wrap primary-menu-toggle" data-toggler="toggled"><?php esc_html_e( 'Menu', 'webikon' ); ?></button>
				<div id="primary-menu-wrap" class="primary-menu-wrap" data-toggler="toggled" data-animate="show hide">
					<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu', 'menu_class' => 'menu menu--main', 'depth' => 1, 'container' => false ) ); ?>
				</div>
			</nav><!-- #site-navigation -->
		</header><!-- #masthead -->
	</div>

	<div id="content" class="site-content">
