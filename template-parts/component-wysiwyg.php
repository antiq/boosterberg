<?php

$content = get_sub_field( 'wysiwyg' );

?>

<div class="the-content wysiwyg">
	<?php echo apply_filters( 'the_content', $content ); ?>
</div>
