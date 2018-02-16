/**
 * Model containing neighborhood places information
 */
var PopularPlaces = function (item) {
    "use strict";

    this.name = ko.observable(item.venue.name);
    this.category = ko.observable(item.venue.categories[0].name);
    this.address = ko.observable(item.venue.location.formattedAddress);
    this.rating = ko.observable(item.venue.rating);
    this.imgVenue = ko.observable('https://irs0.4sqi.net/img/general/100x100' + item.venue.photos.groups[0].items[0].suffix);
    this.venue = item.venue;
};


var appViewModel = function () {
    "use strict";

    var self = this;

    // an array containing all the map location markers
    var Markers = [];

    // observable arrays to store all the popular places in it
    self.allPlaces = ko.observableArray([]);
    self.placeList = ko.observableArray([]);

    // filter by name function
    self.filterByName = ko.observable('');

    //preferred location to find places in the searchbar
    this.setLocation = ko.observable("Rome");

    //preferred type of business, shop or whatever a user is looking for, close to the place searched
    this.setType = ko.observable("restaurant");

    // The info window displayed when a user clicks on a marker or on the elements contained in the venue list
    if (typeof google != "undefined") {
        var infoWindow = new google.maps.InfoWindow();
    }

    /**
     * Remove all the markers from the map
     */

    function clearMarkers() {
        for (var i = 0; i < Markers.length; i++) {
            Markers[i].setMap(null);
        }
    }

    /**
     * Setting Google Map boundaries to restrict the range of the searched area
     * @param {object} bounds_suggested - boundries from API.
     */

    function mapBounds(bounds_suggested) {
        if (typeof google != "undefined") {
            // set bounds according to suggested boundaries from Foursquare API
            var bounds_target = new google.maps.LatLngBounds(
                new google.maps.LatLng(bounds_suggested.sw.lat, bounds_suggested.sw.lng),
                new google.maps.LatLng(bounds_suggested.ne.lat, bounds_suggested.ne.lng)
            );
            neighborMap.fitBounds(bounds_target);
            // center the map when it's loaded
            neighborMap.setCenter(bounds_target.getCenter());
            // set map zoom
            neighborMap.setZoom(12);
        }
    }

    /**
     * When the search button is clicked by the user, the function is called
     * First filter through list if the key word was not in current list
     * then send it through API call
     */
    self.searchPlaces = function () {

        //create an array to pass places to google map
        var mapPlaces = [];
        clearMarkers();

        // empty out popular list array for each search
        self.placeList([]);
        self.allPlaces([]);


        // Near of places for api reauest
        var placeNear = '&near=' + self.setLocation();
        // Query to find places
        var query = '&query=' + self.setType();
        // Loading popular places
        var foursquareUrl = 'https://api.foursquare.com/v2/venues/explore?' + '&client_id=TSKIN0T4GWCHC5VKCHUGGJ4OZC2KLWU3MTY2E5SIIT4XYDSP' + '&client_secret= TGXY1KT4VJLHCAYFJZ5IS5EKZWYRTE0EC1WSW11CZ2G0YT3Y' + '&v=20150102&venuePhotos=1' + placeNear + query;

        //Getting data from Foursquare API
        $.getJSON(foursquareUrl, function (data) {

            var places = data.response.groups[0].items;
            mapBounds(data.response.suggestedBounds);

            for (var i = 0; i < places.length; i++) {
                var item = places[i];
                // just add those items in list which has picture
                if (item.venue.photos.groups.length !== 0) {
                    var place = new PopularPlaces(item);
                    self.allPlaces.push(place);
                    self.placeList.push(place);
                    mapPlaces.push(item.venue);
                }
            }
            // sort an array based on ranking
            self.placeList.sort(function (left, right) {
                return left.rating() == right.rating() ? 0 : (left.rating() > right.rating() ? -1 : 1);
            });

            // create marker for all places on map
            pinPoster(mapPlaces, true);
        }).error(function (e) {
            $('.venue-group').html('<h4>There is an issue in retrieving data from Foursquare</br>Please try again</h4>');
            $('#map-error').append('<h4 class="mobile-error">There is an issue to retrieve data from Foursquare</br>Please try again</h4>');
            console.log('fail');
        });
    };

    self.searchPlaces();

    self.searchFiltered = function () {
        self.placeList.removeAll();
        var venues = [];

        for (var i in self.allPlaces()) {
            if(self.allPlaces()[i].name().toLowerCase().indexOf(self.filterByName().toLowerCase()) >= 0) {
                self.placeList.push(self.allPlaces()[i]);
                venues.push(self.allPlaces()[i].venue);
            }
        }

        clearMarkers();
        pinPoster(venues, false);
    };

    self.filterByName.subscribe(self.searchFiltered);

    /**
     * Setting values inside the Info Window
     * @param {object} placeData - places retrieved from api
     * @param {object} marker - marker location
     */

    function setInfoWindow(placeData, marker) {

        var address = placeData.location.address + ',' + placeData.location.city + ',' + placeData.location.country; // address for the place
        var name = placeData.name;

        var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=200x110&location=' + address + '';
        //create new content
        var contentString = '<div class="venueInfowindow">' + '<div class="venueName">' + name  + '<br>' + '<p class="venue-address">' + address + '</p>' + '</div>'  + '<img class="bgimg" src="' + streetviewUrl + '">' + '</div>';

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(contentString);
            infoWindow.open(neighborMap, marker);
        });
    }

    /**
     * createMapMarker(placeData) reads Places information to create map pins.
     * @param {object} placeData - placeData is the object returned from search results containing information about the place from fourSquare Api
     * @param animate - parameter to manage the drop animation of the map marker
     */

    function createMapMarker(placeData, animate) {

        var lat = placeData.location.lat; // latitude from the place service
        var lon = placeData.location.lng; // longitude from the place service
        var name = placeData.name; // name of the place from the place service

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
            map: neighborMap,
            animation: animate ? google.maps.Animation.DROP : null,
            position: new google.maps.LatLng(lat, lon),
            title: name
        });
        // Bouncing marker function
        marker.addListener('click', toggleBounce);

        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () { marker.setAnimation(null); }, 1430);
            }
        }

        //save marker for each place in this array
        Markers.push(marker);

        setInfoWindow(placeData, marker);

    }

    /**
     * pinPoster(Places) takes in the array of Places received from Foursquare and call createMapMarker for each location
     * @param {object} Places - is an array of object returned from search results containing information about the places from FourSquare Api
     */

    function pinPoster(Places, animate) {
        // call createMapMarker for places
        for (var i in Places) {
            createMapMarker(Places[i], animate);
        }
    }
    /**
     * Change the value of the boolean when the toggle is cliced
    **/

    self.toggleSymbol = ko.observable('hide');
    self.mobileToggleSymbol = ko.observable('hide');


    //toggles the list view on desktop
    self.listToggle = function () {
        if (self.toggleSymbol() === 'hide') {
            self.toggleSymbol('show');
        } else {
            self.toggleSymbol('hide');
        }
    };
    //toggle the list view on mobile/tablet
    self.mobileListToggle = function () {
        if (self.toggleSymbol() === 'hide') {
            self.toggleSymbol('show');
        } else {
            self.toggleSymbol('hide');
        }
    };

    /**
     * When list item clicked on UI then call this function
     * Look if name of clicked item is equal to anyone in markers list
     * @param {object} venue - is an object  containing information about the clicked place
     */
    self.focusMarker = function (venue) {
        var venueName = venue.name();
        for (var i = 0; i < Markers.length; i++) {
            if (Markers[i].title == venueName) {
                google.maps.event.trigger(Markers[i], 'click');
                neighborMap.panTo(Markers[i].position);
            }
        }
    };
};

// Declaring a global MAP variable
var neighborMap;

/**
 * Initialize google MAP
*/

var googleSuccess = function initMap() {

    // This next line makes `neighborMap` a new Google Map JavaScript Object and attaches it to
    neighborMap = new google.maps.Map(document.getElementById('map-canvas'), {
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
    });
    $('#map-canvas').height($(window).height());

    $(document).ready(function () {
        ko.applyBindings(new appViewModel());
        console.log('Success Test');
    });
};

var googleError = function () {

    //If Google Maps doesn't respond
    $('#map-error').append('<h4>There is problem to retrieve data from Google Maps</br>Please try again</h4>');
    $(document).ready(function () {
        ko.applyBindings(new appViewModel());
        console.log('VM Test');
    });
    console.log('Error Test');
};




