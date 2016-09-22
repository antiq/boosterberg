<?php

function boosterberg_page_builder() {

	if( have_rows( 'template_parts' ) ) :

		while ( have_rows( 'template_parts') ) : the_row();

			get_template_part( 'template-parts/component', get_row_layout() );


		endwhile;

	endif;

}
