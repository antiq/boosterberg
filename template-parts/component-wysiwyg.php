<?php

$content = get_sub_field( 'wysiwyg' );
$component_width = get_sub_field( 'width' );

$wrapper_classes = array(
	'the-content',
	'wysiwyg',
	$component_width
);

?>

<div class="<?php echo join( ' ', $wrapper_classes ); ?>">
	<?php echo apply_filters( 'the_content', $content ); ?>
</div>
