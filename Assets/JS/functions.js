$(function() {
	smoothScroll();
	workBelt();
	workLoad();
	courseStuff()

	$("header h1").fitText(1.2, { minFontSize: '20px', maxFontSize: '72px' });
});

function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function workBelt() {
	$('.thumb-unit').click(function() {
		$('.work-belt').css('left','-100%');
		$('.work-container').show(800);
	});
	$('.work-return').click(function() {
		$('.work-belt').css('left','0%');
		$('.work-container').hide(800);
	});




}

function workLoad() {
	$.ajaxSetup({ cache: true });

	$('.thumb-unit').click(function() {
		var $this = $(this),
			$newTitle = $this.find('strong').text(),
			newfolder = $this.data('folder'),
			spinner = '<div class="loader">Loading...</div>';
			newHTML = '/MyPortfolio/work/'+ newfolder +'.html';
		$('.project-load').html(spinner).load(newHTML);
		$('.project-title').text(newTitle);
	})

}

function courseStuff() {
	$('.course-unit').first().addClass('active-course');
	$('.course-logo').first().addClass('active-course');
	$('.courses-mobile-nav span').first().addClass('active-course');

	$('.course-logo, .courses-mobile-nav span').click(function() {
		var $this = $(this),
			$siblings = $this.parent().children(),
			position = $siblings.index($this);
		
		$('.course-unit').removeClass('active-course').eq(position).addClass('active-course');
		$siblings.removeClass('active-course');
		$this.addClass('active-course');

	});

	$('.course-control-next, .course-control-prev').click(function() {

		var $this = $(this),
			curActiveCourse = $('.course-belt').find('.active-course'),
			position = $('.course-belt').children().index(curActiveCourse),
			courseNum = $('.course-unit').length;

			if($this.hasClass('course-control-next')) {
				if(position < courseNum -1){

			$('.active-course').removeClass('active-course').next().addClass('active-course');
			
			} else {

				$('.course-unit').removeClass('active-course').first().addClass('active-course');
				$('.course-logo').removeClass('active-course').first().addClass('active-course');
				

			}
		}	else {
			if (position === 0) {
				$('.course-unit').removeClass('active-course').last().addClass('active-course');
				$('.course-logo').removeClass('active-course').last().addClass('active-course');
			} else {
				$('.active-course').removeClass('active-course').prev().addClass('active-course');
			}
			

	}
	});

}

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
