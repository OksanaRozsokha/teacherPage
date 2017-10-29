
$(document).ready(function() {

    $(".main-nav").on("click", "a", function (event) {
        event.preventDefault();

        let id = $(this).attr('href'),
            top = $(id).offset().top;

        $('body,html').animate({ scrollTop: top }, 1200);
    });
       
        $(".owl-carousel").owlCarousel({
        items: 1,
        dots: true,
        loop: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 10000
    });


    //outline none

    $('button, a').on('focus', function () {
        $(this).blur();
    });



});