var mymap = L.map("map").setView([23.673872110187137, -15.697510915389563], 3);


var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);


// Set layers
var pnt_layer = L.layerGroup().addTo(mymap);
var gc_layer = L.layerGroup().addTo(mymap);
var mp_layer = L.layerGroup().addTo(mymap);



// Draw points
L.marker([51.50735, -0.1277583], {draggable: true}).addEventListener("drag", drawGC).addTo(pnt_layer);
L.marker([40.71278, -74.0059413],{draggable: true}).addEventListener("drag", drawGC).addTo(pnt_layer);

// Function to draw Great Circle line
function drawGC() {
    gc_layer.clearLayers();
    mp_layer.clearLayers();
    points = pnt_layer.toGeoJSON();
    var gc = turf.greatCircle(points.features[0], points.features[1]);
    var mp = turf.midpoint(points.features[0], points.features[1]);
    L.geoJSON(gc).addTo(gc_layer);
    L.geoJSON(mp).addTo(mp_layer);
}
drawGC();


