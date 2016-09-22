<?php

$companies_title = get_sub_field( 'title' );
$companies = get_sub_field( 'companies' );

$component_width = get_sub_field( 'width' );

$wrapper_classes = array(
	'companies',
	$component_width
);


if ( $companies ) :
?>

<div class="<?php echo join( ' ', $wrapper_classes ); ?>">

	<?php if( $companies_title ) : ?>
		<h2 class="companies__title">
			<?php echo $companies_title; ?>
		</h2>
	<?php endif; ?>

	<ul class="companies__list">
		<?php foreach( $companies as $company ) :  ?>
			<li class="companies__item">
				<?php echo get_the_post_thumbnail( $company, 'medium', array( 'class' => 'companies__item__image') ); ?>
			</li>
		<?php endforeach; ?>
	</ul>

</div>

<?php endif;
