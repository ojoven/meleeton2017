// HYPE GENERATOR
var hype = 0;
var $hypeButton = $(".hype-button");
var $hypePopup = $('.hype-popup');
$hypeButton.on('mousedown touchstart', function(){
	hypeMouseDown();
	return false;
}).on('mouseup touchend', function(){
	$hypeButton.removeClass("active");
	return false;
});

function hypeMouseDown() {
	var $hypeButton = $(".hype-button");
	var $hypePopup = $('.hype-popup');
	$hypeButton.addClass("active");
	hype++;
	if (hype <= 8) {
		$('.hype-bar-in').css('width',(hype*10)+'%');
	} else {
		// Finished
		$hypePopup.addClass('active');
		$('body').css('overflow', 'hidden');
	}
}

$hypeButton.on('click', function() {
	return false;
});

$('.close-popup').on('click', function() {
	$hypePopup.removeClass('active');
	$('body').css('overflow', 'visible');
	$('.hype-generator .hype-button span').hide();
	$('.hype-generator .hype-button .error').show();
	return false;
});

setTimeout(function() {
	twttr.events.bind(
		'tweet',
		function (ev) {
			console.log(ev);
			$hypePopup.removeClass('active');
			$('body').css('overflow', 'visible');
			$('.hype-generator .hype-button span').hide();
			$('.hype-generator .hype-button .success').show();
			$('.hype-bar-in').css('width','100%'); // Hype to 100%
			$hypeButton.off().on('click', function() {
				return false; // Remove bind
			});
			$('.hype-generator h2').html('¡Gracias, de verdad!');
		}
	);
}, 2000);

 $("#countdown")
 .countdown("2017/04/22", function(event) {
            $(this).html(
                event.strftime('<span class="time days"><i>%D</i> días</span> <span class="time hours"><i>%H</i> horas</span> <span class="time minutes"><i>%M</i> minutos</span> <span class="time seconds"><i>%S</i> segundos</span>')
            );
        });

// Initialize and Configure Magnific Popup Lightbox Plugin
$('.popup-gallery').magnificPopup({
	delegate: 'a',
	type: 'image',
	tLoading: 'Loading image #%curr%...',
	mainClass: 'mfp-img-mobile',
	gallery: {
		enabled: true,
		navigateByImgClick: true,
		preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
	},
	image: {
		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
	}
});