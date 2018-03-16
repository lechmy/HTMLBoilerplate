$(document).ready(function () {
    $('.js-studio-slider-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        arrows: false,
        fade: false,
        asNavFor: '.js-studio-slider-nav'
    });

    $('.js-studio-slider-nav').slick({
        slidesToShow: getSlidesNumber(),
        slidesToScroll: 1,
        asNavFor: '.js-studio-slider-main',
        focusOnSelect: true,
        infinite: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: getSlidesNumber(),
                    slidesToScroll: getSlidesNumber(),
                }
            }
        ]
    });

    $('.js-contact-datetime-picker').datetimepicker();

    $('.js-contact-phone-number').inputmask({
        mask: "0(199)|(99)/9{6,9}",
        placeholder: "_"
    });
})

function getSlidesNumber() {
    var container = $('.js-studio-slider-nav').width();
    if (container > $('.studio-slide-small').length * 100) {
        container = $('.studio-slide-small').length * 100;
    }
    return Math.floor(container / 100);
}

function googleLocationMap() {

    var position = { lat: 52.5067614, lng: 13.284651 };
    var image = {
        url: '/assets/images/pin.png',
    };

    var map = new google.maps.Map(document.getElementById('sellerProfileMap'), {
        center: position,
        zoom: 11
    });
    var marker = new google.maps.Marker({
        map: map,
        position: position,
        icon: image
    });
}
