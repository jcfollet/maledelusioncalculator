
var zoom_calc = (0.00078125 * window.innerWidth) + 3.7

// create the map
var map = L.map('map', {
    maxBounds: [[24.5, -125.0], [49.5, -66.0]],
    minZoom: 0,
    zoomSnap: 0,
    zoomControl: false,
}).setView([37.8, -96], zoom_calc);

var geojson;

var prev_selection;

function highlightFeature(e) {
var layer = e.target;

layer.setStyle({
    weight: 2,
    color: 'black',
    fillOpacity: 0.7
});

// if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
// layer.bringToFront();
// }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    geojson.resetStyle(prev_selection);
    prev_selection = e.target;
    map.fitBounds(e.target.getBounds(), {padding: [400, 400]});

    prev_selection.setStyle({
    weight: 3,
    fillColor: 'grey',
    fillOpacity: 1
    });

    // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    // layer.bringToFront();
    // }
}

function onEachFeature(feature, layer) {
    layer.on({
    //mouseover: highlightFeature,
    //mouseout: resetHighlight,
    click: zoomToFeature
    });
}

geojson = L.geoJSON.ajax('usa.json', {
    style: function(feature) {
        return {
            fillColor: '#303956',
            weight: 2,
            opacity: 1,
            color: 'black',
            fillOpacity: 1
        };
    },
    onEachFeature: onEachFeature
}).addTo(map);

window.addEventListener("resize", function() {
    map.setZoom((0.00078125 * window.innerWidth) + 3.7);
});
