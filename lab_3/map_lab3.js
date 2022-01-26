
var mymap = L.map("map", {
    center: [46.65515269578446, 8.708739314558096], 
    zoom: 8});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);


var myIcon = L.icon({
    iconUrl: 'icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});


var zurich = L.marker([47.37707, 8.53956], {icon: myIcon}).bindPopup("<b>Zurich").addTo(mymap);
var laus = L.marker([46.5196, 6.63222], {icon: myIcon}).bindPopup("<b>Lausanne").addTo(mymap);
var geneva = L.marker([46.20833, 6.14275], {icon: myIcon}).bindPopup("<b>Geneva").addTo(mymap);
var mont = L.marker([46.43169, 6.91044], {icon: myIcon}).bindPopup("<b>Montreux").addTo(mymap);
var cdc = L.marker([46.41414, 6.92753], {icon: myIcon}).bindPopup("<b>Château de Chillon").addTo(mymap);
var vevey = L.marker([46.46228, 6.84297], {icon: myIcon}).bindPopup("<b>Vevey").addTo(mymap);
var bern = L.marker([46.94843, 7.44046], {icon: myIcon}).bindPopup("<b>Bern").addTo(mymap);
var lucerne = L.marker([47.04954, 8.30437], {icon: myIcon}).bindPopup("<b>Lucerne").addTo(mymap);
var inter = L.marker([46.6845, 7.85349], {icon: myIcon}).bindPopup("<b>Interlaken").addTo(mymap);
var jung = L.marker([46.53678, 7.96223], {icon: myIcon}).bindPopup("<b>Jungfrau").addTo(mymap);
var zerm = L.marker([46.02416, 7.74841], {icon: myIcon}).bindPopup("<b>Zermatt").addTo(mymap);
var stm = L.marker([46.49705, 9.83816], {icon: myIcon}).bindPopup("<b>St. Moritz").addTo(mymap);
