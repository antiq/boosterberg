<?php

$columns = get_sub_field( 'columns' );
$layout = get_sub_field( 'layout' );
$component_width = get_sub_field( 'width' );

$wrapper_classes = array(
	'columns',
	'columns--' . $layout,
	$component_width
);

if ( $columns ) :
?>

<div class="<?php echo join( ' ', $wrapper_classes ); ?>">
	<?php foreach ( $columns as $column ) : ?>

		<div class="columns__column">

			<?php if ( ! empty( $column['link_title'] ) && ! empty( $column['link_url'] ) ) :
        $link = $column['link_url']; if(is_numeric($link)) $link = get_permalink($link); ?>
				<a href="<?php echo $link; ?>" class="columns__link" title="<?php echo get_the_title( $column['link_url'] ); ?>">
			<?php endif; ?>

					<?php echo wp_get_attachment_image( $column['image'], 'medium', false, array( 'class' => 'columns__image'  ) ); ?>

					<?php if ( ! empty( $column['title'] ) ) : ?>
						<h2 class="columns__title">
							<?php echo $column['title']; ?>
						</h2>
					<?php endif; ?>

					<?php if ( ! empty( $column['content'] ) ) : ?>
						<div class="columns__text">
							<?php echo apply_filters( 'the_content', $column['content'] ); ?>
							<?php if ( ! empty( $column['link_title'] ) && ! empty( $column['link_url'] ) ) : ?>
								<button type="button" class="columns__button button hollow">
									<?php echo $column['link_title']; ?>
									<?php echo boosterberg_get_icon( 'arrow-right' ); ?>
								</button>
							<?php endif; ?>
						</div>
					<?php endif; ?>

			<?php if ( ! empty( $column['link_title'] ) && ! empty( $column['link_url'] ) ) : ?>
				</a>
			<?php endif; ?>

		</div>

	<?php endforeach; ?>
</div>

<?php endif;
