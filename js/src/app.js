(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

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

    /**
    $("#countdown")
        .countdown("2017/04/22", function(event) {
            $(this).html(
                event.strftime('<span class="time days"><i>%D</i> días</span> <span class="time hours"><i>%H</i> horas</span> <span class="time minutes"><i>%M</i> minutos</span> <span class="time seconds"><i>%S</i> segundos</span>')
            );
        });
    **/

    // Buy tickets
    $('#to-buy-ticket').on('click', function() {
        $('.buy-ticket-info').slideToggle();
        return false;
    });

    // HYPE GENERATOR
    var hype = 0;
    $(".hype-button").mousedown(function(){
        $(".hype-button").addClass("active");
        hype++;
        if (hype <= 10) {
            $('.hype-bar-in').css('width',(hype*10)+'%');
        } else {
            // Finished
        }
        return false;
    }).mouseup(function(){
        $(".hype-button").removeClass("active");
        return false;
    });

    $(".hype-button").on('click', function() {
       return false;
    });


})(jQuery); // End of use strict
