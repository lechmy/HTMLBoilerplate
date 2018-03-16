$(document).on('click', '.js-minimize-box', function () {
    $(this).parent().toggleClass('minimized');
});

$(document).on('click', '.js-show-more-filters', function () {
    $(this).prev('.serviceList').toggleClass('minimized');
    if ($(this).prev('.serviceList').hasClass('minimized')) {
        $(this).text('Show more');
    } else {
        $(this).text('Show less');
    }
});

$(document).on('click', '.js-select-filter', function () {
    $(this).toggleClass('selected');
});


$(document).on('input', '.js-budget-range', function () {
    var value = $(this).val();
    var max = $(this).attr('max');
    $('.js-current-value').text(value);

    var position = ($(this).parent().width() / max) * value + (18 - (36 * value / max));
    $('.js-current-value').css({ left: position });
});

function googleLocationMap(pins) {
    pins = [{ lat: 52.5067614, lng: 13.284651 }, { lat: 52.5034614, lng: 13.283321 }, { lat: 52.5043674, lng: 13.267151 }, { lat: 52.559919, lng: 13.443681}];
    var position = { lat: 52.5067614, lng: 13.284651 };
    var bounds = new google.maps.LatLngBounds(); 
    var markers = [];

    var map = new google.maps.Map(document.getElementById('searchResultMap'), {
        center: position,
        zoom: 11
        //gestureHandling: 'greedy'
    });

    var infowindow = new google.maps.InfoWindow();
    var image = {
        url: '/assets/images/pin.png',
    };

    pins.forEach(function (item) {
        bounds.extend(item);
        var marker = new google.maps.Marker({
            position: item,
            link: item.lat,
            icon: image
        });
        //var infowindow = new google.maps.InfoWindow({ content: '<a href="/">Link to profile</a>' });
        //infowindow.content = '<a href="/">Link to profile</a>';

        marker.addListener('click', function () {
            //infowindow.setContent('<a href="/'+ this.link +'">Link to profile</a>');
            infowindow.setContent(''+this.link);
            infowindow.open(map, marker);
        });
        markers.push(marker);
    });

    var markerCluster = new MarkerClusterer(map, markers,
        { imagePath: '/assets/images/cluster' });

    if (pins.length) {
        map.fitBounds(bounds);
    }
}
