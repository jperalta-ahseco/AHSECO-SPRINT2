initMap = function (parametros) {
    parametros = angular.extend({}, { map: 'map', center: { lat: -4.1459489, lng: -81.10995359999998 }, zoom: 21, minZoom: 0, maxZoom: 18, disableDefaultUI: false, zoomControl: true, mapTypeControl: true, mapTypeId: google.maps.MapTypeId.ROADMAP, disableDoubleClickZoom: true, draggable: true, scaleControl: true, streetViewControl: true, styles: mapDefault }, parametros || {});
    console.dir(parametros);
    var mapDiv = document.getElementById(parametros.map);

    var mapDefault = [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff"}] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99}] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54}] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9"}] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1"}] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676"}] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff"}] }, { "featureType": "poi", "stylers": [{ "visibility": "on"}] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#EBE5E0"}] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on"}] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on"}]}];
    var mapGray = [{featureType: "all",elementType: "all",stylers: [{ saturation: -100 }]}];
	var mapTerra = [{ "featureType": "landscape", "stylers": [{ "hue": "#FFBB00" }, { "saturation": 43.400000000000006 }, { "lightness": 37.599999999999994 }, { "gamma": 1}] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FFC200" }, { "saturation": -61.8 }, { "lightness": 45.599999999999994 }, { "gamma": 1}] }, { "featureType": "road.arterial", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 51.19999999999999 }, { "gamma": 1}] }, { "featureType": "road.local", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 52 }, { "gamma": 1}] }, { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": -13.200000000000003 }, { "lightness": 2.4000000000000057 }, { "gamma": 1}] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF6A" }, { "saturation": -1.0989010989011234 }, { "lightness": 11.200000000000017 }, { "gamma": 1}]}];

    
    //https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions
    var mapOptions = {
        center: parametros.center,
        zoom: parametros.zoom,
        disableDefaultUI: parametros.disableDefaultUI, //deshabilita/habilita todos los controles
        zoomControl: parametros.disableDefaultUI ? false : parametros.zoomControl,
        mapTypeControl: parametros.disableDefaultUI ? false : parametros.mapTypeControl,
        mapTypeId: parametros.mapTypeId, //TERRAIN, ROADMAP, SATELLITE, HYBRID
        disableDoubleClickZoom: parametros.disableDoubleClickZoom,
        backgroundColor: "#000",
        draggable: parametros.draggable,
        minZoom: parametros.minZoom,
        maxZoom: parametros.maxZoom,
        scaleControl: parametros.disableDefaultUI ? false : parametros.scaleControl,
        streetViewControl: parametros.disableDefaultUI ? false : parametros.streetViewControl,
        styles: parametros.styles == "mapDefault" ? mapDefault : parametros.styles == "mapGray" ? mapGray : parametros.styles == "mapTerra" ? mapTerra : null
        /*mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, //DROPDOWN_MENU, HORIZONTAL_BAR
        mapTypeIds: [
        google.maps.MapTypeId.TERRAIN,
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.SATELLITE,
        google.maps.MapTypeId.HYBRID
        ],
        position: google.maps.ControlPosition.LEFT_TOP
        },
        zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
        }*/
    };
    return new google.maps.Map(mapDiv, mapOptions);
    //searchPlace();
    //$scope.map.addListener('click', addMarkerAtMouse);

    /*var formulario = document.getElementById('formulario');
    $scope.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(formulario);*/
}

//Permite pintar las coordenadas X Y (lat, lng)
paintCoords = function (ubicacion) {
    console.dir(ubicacion.lat().toString());
    document.getElementById('CoordX').value = ubicacion.lat().toString();
    document.getElementById('CoordY').value = ubicacion.lng().toString();
};
var markerIcon = {
    url: 'http://image.flaticon.com/icons/svg/252/252025.svg',
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(32, 65)
};
//Permite agregar un marcador
addMarker = function (parametros, $scope) {
    parametros = angular.extend({},{position: {lat: -4.1459489, lng: -81.10995359999998}, draggable: true, animation: google.maps.Animation.DROP, icon: "../Images/markerDefault.png"}, parametros || {});
    var marker = new google.maps.Marker({
        map: $scope.map, //indica en que mapa va a pintar
        position: parametros.position, //indica en donde va a pintar
        draggable: parametros.draggable, //indica si el marcador se puede mover
        //labelClass: "labels",
        //customInfo: "<p><strong>Store Name</strong></p>22222<p><strong>Address</strong></p>3333333333333<p><strong>Phone</strong></p>JDJDJDJDJ",

        //label: parametros.labelContent, //indica si el marcador se puede mover
        
     
        //label: String(markerCount), //indica el caracterer que se va mostrar en el marcador, acepta solo 1 caracter
        icon: parametros.icon, //indica la imagen del marcador a usar
        animation: parametros.animation //BOUNCE, DROP
    })
    return marker;
    //paintCoords(ubicacion);
    //marker.addListener('mouseover', addInfoWindow);
    //marker.addListener('click', addAnimation)
    //marker.addListener('click', addInfoWindow)
};

addMarkerDetalle = function (parametros, $scope) {
    parametros = angular.extend({}, { position: { lat: -4.1459489, lng: -81.10995359999998 }, draggable: true, animation: google.maps.Animation.DROP, icon: "../Images/markerDefault.png" }, parametros || {});
    var marker = new google.maps.Marker({
        map: $scope.map, //indica en que mapa va a pintar
        position: parametros.position, //indica en donde va a pintar
        draggable: parametros.draggable, //indica si el marcador se puede mover
        //label: "A"
        //label: String(markerCount), //indica el caracterer que se va mostrar en el marcador, acepta solo 1 caracter
        icon: parametros.icon, //indica la imagen del marcador a usar
        animation: parametros.animation //BOUNCE, DROP
    })
    return marker;
    //paintCoords(ubicacion);
    //marker.addListener('mouseover', addInfoWindow);
    //marker.addListener('click', addAnimation)
    //marker.addListener('click', addInfoWindow)
};

addMarkerLabel = function (parametros, $scope) {
    parametros = angular.extend({}, { position: { lat: -4.1459489, lng: -81.10995359999998 }, draggable: true, animation: google.maps.Animation.DROP, icon: "../Images/markerDefault.png" }, parametros || {});
    var marker = new google.maps.Marker({
        map: $scope.map, //indica en que mapa va a pintar
        position: parametros.position, //indica en donde va a pintar
        draggable: parametros.draggable, //indica si el marcador se puede mover
        //labelClass: "labels",
        //customInfo: "<p><strong>Store Name</strong></p>22222<p><strong>Address</strong></p>3333333333333<p><strong>Phone</strong></p>JDJDJDJDJ",

        //label: parametros.labelContent, //indica si el marcador se puede mover

        label: {
            text: parametros.labelContent,
            color: 'white',

            fontSize: "15px",
            fontWeight: "bold",
        },
        //label: String(markerCount), //indica el caracterer que se va mostrar en el marcador, acepta solo 1 caracter
        icon: parametros.icon, //indica la imagen del marcador a usar
        animation: parametros.animation //BOUNCE, DROP
    })
    return marker;
    //paintCoords(ubicacion);
    //marker.addListener('mouseover', addInfoWindow);
    //marker.addListener('click', addAnimation)
    //marker.addListener('click', addInfoWindow)
};

deleteMarker = function (marker) {
    marker.setMap(null);
};

searchPlace = function ($scope) {
    var search = document.getElementById('search');
    //SearchBox => permite realizar las busquedas, parametro(cuadro de texto de busqueda)
    var searchBox = new google.maps.places.SearchBox(search);
    //Permie posisionar el cuadro de texto de busqueda
    //$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(search);
    var ubicacion;
    console.log("sadsadsadsd ",searchBox);
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        places.forEach(function (place) {
            ubicacion = place.geometry.location;
            //addMarker({ position: ubicacion, draggable: false }, $scope);
            //paintCoords(ubicacion);
            $scope.map.setCenter(ubicacion);
            $scope.map.setZoom(15);
        })
    })
    return ubicacion;
};

addInfoWindow = function (e) {
    //https://developers.google.com/maps/documentation/javascript/3.exp/reference#Geocoder
    var geocoder = new google.maps.Geocoder;
    var infoWindow = new google.maps.InfoWindow({
        maxWidth: 100
    });
    var self = this;
    console.log(e.latLng.lat());
    geocoder.geocode({ 'location': e.latLng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var placeName = results[1].address_components[0].short_name;
            var placeAddress = results[1].formatted_address;
            var infoContent = placeName + "<hr>" + placeAddress;
            console.log("ss",results);
            //permite asignar el contenido
            infoWindow.setContent(infoContent);
            //permite mostrar la ventana de informacion, parametros(mapa, localizacion)
            console.log("aki",infoContent, "--->", self);
            infoWindow.open($('#map'), self);
        }
    })
};

showKML = function (ruta) {
    //$scope.clearLayer();
    layer = new google.maps.KmlLayer();
    //layer.setUrl('http://mexicometro.org/Mexico-Metro.kml');
    //layer.setUrl('http://s3.amazonaws.com/copegob/reportes/lima.kml');
    layer.setUrl(ruta);
    layer.setMap($scope.map);

}
