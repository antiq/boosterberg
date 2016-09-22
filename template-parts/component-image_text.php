<?php

$layout = get_sub_field( 'layout' );
$title = get_sub_field( 'title' );
$image = get_sub_field( 'image' );
$content = get_sub_field( 'text' );
$component_width = get_sub_field( 'width' );


$wrapper_classes = array(
	$layout,
	$component_width
);

?>

<div class="<?php echo join( ' ', $wrapper_classes ); ?>">
	<?php if( $title ) : ?>
		<h2 class="image-text__title"><?php echo $title; ?></h2>
	<?php endif; ?>
	<div class="image-text__image">
		<?php echo wp_get_attachment_image( $image, 'large', false, array( 'class' => 'image-text__img' ) ); ?>
	</div>
	<div class="image-text__content">
		<?php echo $content; ?>
	</div>
</div>
