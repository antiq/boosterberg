jQuery(document).ready(function($) {
	$(document).foundation();

	Foundation.Motion.animateIn(
		$('.hero__animation-control'),
		'animate',
		function() {
			this.addClass( 'done' );
		}
	);

	var stickyHeader = $('.sticky-header');

	$(window).on( 'scroll', Foundation.util.throttle( function(e){
		console.log( 'scroll' );
		if( $(window).scrollTop() > 100 && ! stickyHeader.hasClass('is-stuck') ) {
			stickyHeader.addClass( 'is-stuck' );
		} else if ( $(window).scrollTop() < 100 && stickyHeader.hasClass('is-stuck') ) {
			stickyHeader.removeClass( 'is-stuck' );
		}
	}, 200 ));


});
