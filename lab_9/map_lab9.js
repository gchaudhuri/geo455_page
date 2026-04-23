var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

var mymap = L.map('map', {
    center: [43.09157730670122, -89.41174811804763],
    zoom: 8,
    layers: [Esri_WorldGrayCanvas]
});  


var migrationLayer = new L.migrationLayer({
    map: mymap,
    data: data,
    pulseRadius:25,
    pulseBorderWidth:1,
    arcWidth:1,
    arcLabel:false,
    arcLabelFont:'14px sans-serif',
    maxWidth:10
});


var cities = L.geoJson(loc, {
     style: function (feature) {
        return {
            color: '#8fb2ee',
            weight: 1,
            opacity: 0.7,
        };
    },
    onEachFeature: function(feature, featureLayer) {
        featureLayer.bindTooltip(feature.properties.NAME + ' - ' + feature.properties.Workers_in + ' commuters', {permanent: false, direction: 'right'});
    }
}).addTo(mymap);
    

migrationLayer.addTo(mymap);

// mymap.fitBounds(cities.getBounds());

// --------------------------------------------------
// 0. BUTTONS
// --------------------------------------------------

function hide(){
    migrationLayer.hide();
}
function show(){
    migrationLayer.show();
}
function play(){
    migrationLayer.play();
}
function pause(){
    migrationLayer.pause();
}

// --------------------------------------------------
// 1. LEGEND
// --------------------------------------------------

function getColorDensity(d) {
    if (d > 3253) return '#980043';
    if (d > 1506) return '#dd1c77';
    if (d > 686) return '#df65b0';
    return '#d7b5d8';
}

function buildLegendHTML(title, breaks, colorFn) {
  var labels = [];
  for (var i = 0; i < breaks.length; i++) {
    if (i < breaks.length - 1) {
      labels.push(breaks[i] + ' – ' + breaks[i + 1]);
    } else {
      labels.push(breaks[i] + '+');
    }
  }

  var html = '<div class="legend-title">' + title + '</div>';
  for (var i = 0; i < breaks.length; i++) {
    html += '<div class="legend-box">' +
      '<div class="legend-color" style="background:' + colorFn(breaks[i] + 1) + '"></div>' +
      '<span>' + labels[i] + ' workers</span>' +
    '</div>';
  }
  return html;
  return html;
}

var legendEl = document.getElementById('legend-panel');
legendEl.innerHTML = buildLegendHTML(
  'Commute Flow to Dane County',
  [103, 686, 1506, 3253],
  getColorDensity
);

// --------------------------------------------------
// 2. SCALEBAR
// -------------------------------------------------- 
L.control.scale({position: 'bottomright', maxWidth: '150', metric: 'True'}).addTo(mymap); 
    
        
// --------------------------------------------------
// 3. ADD MINIMAP
// --------------------------------------------------
var miniMapLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var miniMap = new L.Control.MiniMap(miniMapLayer, {
    toggleDisplay: true,
    minimized: false,
    position: 'bottomleft'
}).addTo(mymap);
