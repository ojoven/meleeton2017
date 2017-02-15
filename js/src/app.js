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

    $('#amount').on('change', function() {

        var amount = $(this).val();
        $('.amount').html(amount);
        if (amount != 1) {
            $('.plural' ).html('s');
        } else {
            $('.plural' ).html('');
        }

    });

    $('#to-reservation').on('click', function() {

        var url = '/app/reservation.php';
        var data = {};
        data.name = $('#name').val();
        data.email = $('#email').val();
        data.amount = $('#amount').val();

        var $firstStep = $('.buy-ticket-info .first-step');
        var $loading = $('.buy-ticket-info .loading');
        var $lastStep = $('.buy-ticket-info .last-step');

        // Go to step 2 (loading)
        $firstStep.hide();
        $loading.show();

        $.post(url, data, function(response) {

            // Go to step 3 (response)
            $loading.hide();
            $lastStep.show();

            if (response.success) {
                $lastStep.addClass('success').html('¡Genial! Hemos recibido tu reserva,<br>nos pondremos en contacto contigo en los próximos días.');
            } else {
                $lastStep.addClass('error').html('Parece que hubo algún error.<br>Por favor, contacta con <a href="http://twitter.com/ojoven" target="_blank">http://twitter.com/ojoven</a>');
            }

        });
    });

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

})(jQuery); // End of use strict
