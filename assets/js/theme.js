jQuery(document).ready(function($) {
	$(document).foundation();

	var stickyHeader = $('.sticky-header');

	$(window).on( 'scroll', Foundation.util.throttle( function(e){
		if( $(window).scrollTop() > 100 && ! stickyHeader.hasClass('is-stuck') ) {
			stickyHeader.addClass( 'is-stuck' );
		} else if ( $(window).scrollTop() < 100 && stickyHeader.hasClass('is-stuck') ) {
			stickyHeader.removeClass( 'is-stuck' );
		}
	}, 200 ));


});
