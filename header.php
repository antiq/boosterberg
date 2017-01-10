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
<meta property="og:title" content="Boosterberg - Smart solution for your Facebook post boosting" />
<meta property="og:url" content="http://boosterberg.com/?utm_source=facebook&utm_campaign=FB-plugin&utm_medium=FB-share&utm_content=web-button" />
<meta property="og:description" content="If you spend too much time with manual clicking to boost your Facebook posts, try Boosterberg, save time and increase productivity and efficiency." />
<meta property="fb:app_id" content="1560989787508846" />
<meta property="og:type" content="article" />
<meta property="og:image" content="http://boosterberg.com/wp-content/uploads/2016/10/boosterberg-facebook-post-boosting-i.png" />
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8&appId=1560989787508846";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<?php if ( function_exists( 'gtm4wp_the_gtm_tag' ) ) { gtm4wp_the_gtm_tag(); } ?>
<div id="page" class="site">
<div style="margin:0;padding:0;background-color:#3d8dbc;width:100%;height:200px;z-index:-1;position:absolute;top:0;">&nbsp;</div>
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
