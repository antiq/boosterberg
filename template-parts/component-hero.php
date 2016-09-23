<?php

$title = get_sub_field( 'title' );
$video_url = get_sub_field( 'video_url' );
$subtitle = get_sub_field( 'subtitle' );
$content = get_sub_field( 'content' );

?>

<div class="hero">

	<div class="hero__row">
		<h1 class="hero__title"><span><?php echo $title; ?></span></h1>
		<div class="hero__video-wrap">
			<div class="hero__animation-control">
				<div class="hero__video-toolbar"></div>
				<div class="hero__video">
					<?php echo wp_oembed_get( $video_url, array( 'width' => 560 ) ); ?>
				</div>
			</div>
		</div>
		<h2 class="hero__subtitle"><?php echo $subtitle; ?></h2>
		<div class="hero__content"><?php echo $content; ?></div>
	</div>

</div>
