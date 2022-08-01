var mymap = L.map('map', {
    center: [38.0414635049438, -84.5046953824767],
              zoom: 13,
          });


var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);


var hosp_icon = L.icon({
    iconUrl: 'img/hosp.png',
    iconSize: [20, 20],
    iconAnchor: [0, 0],
});

var lib_icon = L.icon({
    iconUrl: 'img/lib.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
});


// Set layers
var hosp = new L.geoJson(hospitals, {
    onEachFeature: function(feature, featureLayer){
        featureLayer.bindPopup('<b>'+feature.properties.Name+ '</b>');
    }, 
    pointToLayer: function (feature, latlng) {
            var marker1 = L.marker(latlng,{icon: hosp_icon});
            return marker1;
        }}).addTo(mymap);

var near_lyr = L.layerGroup().addTo(mymap);
var lib_lyr = L.layerGroup().addTo(mymap);
        
var lib = new L.geoJson(libraries, {
    onEachFeature: function(feature, featureLayer){
        featureLayer.bindPopup('<b>'+feature.properties.Name+ '</b>');
        featureLayer.addEventListener("click", nearest);
    }, 
    pointToLayer: function (feature, latlng) {
            var marker2 = L.marker(latlng,{icon: lib_icon});
            return marker2;
        }}).addTo(mymap);


// Find out nearest hospital
//var nearest = turf.nearestPoint(lib, hosp);

for(var i = 0; i < hosp.features.length; i++) {
		hosp.features[i].properties['icon-color'] = '#DC143C';
		hosp.features[i].properties['icon-symbol'] = 'hospital';
		hosp.features[i].properties['icon-size'] = 'small';
	};

for(var i = 0; i < lib.features.length; i++) {
		lib.features[i].properties['icon-color'] = '#DC143C';
		lib.features[i].properties['icon-symbol'] = 'hospital';
		lib.features[i].properties['icon-size'] = 'small';

// reset marker size to small

	lib.on('click', function (e) {
		// Reset any and all marker sizes to small
		reset();
		// Get the GeoJSON from libraryFeatures and hospitalFeatures
		var libFeatures = libraries.getGeoJSON();
		var hospFeatures = hospitals.getGeoJSON();

		// Using Turf, find the nearest hospital to library clicked
		var nearestHospital = turf.nearest(e.layer.feature, hospFeatures);

		// Change the nearest hospital to a large marker
		nearestHospital.properties['icon-size'] = 'large';

		// Add the new GeoJSON to hospitalLayer
		hospitals.setGeoJSON(hospFeatures);
	});
    hospFeatures.addTo(mymap);

	// When map loads, zoom to libraryLayer features

