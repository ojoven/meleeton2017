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

        return false;
    });

    $('.to-open-ticket-info').on('click', function() {
        $('.buy-ticket-info').slideToggle();
        $('html, body').stop().animate({
            scrollTop: ($('#to-buy-ticket').offset().top - 100)
        }, 1250, 'easeInOutExpo');
        return false;
    });

})(jQuery); // End of use strict
