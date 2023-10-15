// Importa Leaflet
import L from 'leaflet';
import 'leaflet-easybutton';

// Inicializa el mapa en un punto y nivel de zoom específicos
var map = L.map('map').setView([-25.483828, -54.672011], 20);

// Agrega una capa base de OpenStreetMap al mapa
var openStreetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Agrega una capa de imágenes de satélite de Mapbox
var mapboxSatelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2Fya29zIiwiYSI6ImNsbmdvOGU0MzB1cXkyb3BlNGVub3RtNGgifQ.3gOiABlQ3PtDiQe2-KLGjg', {
    attribution: 'Imágenes de satélite por Mapbox'
});

// Crea un control de capas y agrega las capas base
var baseLayers = {
    "OpenStreetMap": openStreetMapLayer,
    "Mapbox Satellite": mapboxSatelliteLayer
};

var layerControl = L.control.layers(baseLayers).addTo(map);

// Define un estilo para tus características
var myStyle = {
    fillColor: 'green',    // Color de relleno
    fillOpacity: 2,      // Opacidad del relleno
    color: 'blue',         // Color del borde
    weight: 2              // Grosor del borde
};

var myStyle2 = {
    fillColor: 'blue',    // Color de relleno
    fillOpacity: 2,      // Opacidad del relleno
    color: 'blue',         // Color del borde
    weight: 2              // Grosor del borde
};

// Carga y agrega el archivo GeoJSON al mapa
fetch('https://cdn.glitch.global/e07e2922-47a6-4542-a11a-86e039aa6cbf/Arearecreativas.geojson?v=1697226277657')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var geojsonLayer = L.geoJSON(data, {
            style: myStyle, // Aplica el estilo al cargar la capa GeoJSON
        });

        // Agrega un popup con el nombre de la capa
        geojsonLayer.bindPopup(function (layer) {
            return layer.feature.properties.Nombre;
        });
        layerControl.addOverlay(geojsonLayer, 'Area recreativas');
        geojsonLayer.addTo(map);
    });


fetch('https://cdn.glitch.global/e07e2922-47a6-4542-a11a-86e039aa6cbf/BloqueAulas.geojson?v=1697226286882')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var geojsonLayer = L.geoJSON(data, {
            style: myStyle2, // Aplica el estilo al cargar la capa GeoJSON
        });

        // Agrega un popup con el nombre de la capa
        geojsonLayer.bindPopup(function (layer) {
            return layer.feature.properties.Nombre;
        });

        layerControl.addOverlay(geojsonLayer, 'Bloque de aulas');
        geojsonLayer.addTo(map);
    });

// Agregar funcionalidad de geolocalización

map.locate({ setView: true, maxZoom: 16 });

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map)
        .bindPopup("Tu ubicación actual").openPopup();
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);


// Crear un botón para volver a la ubicación actual con un ícono de crosshairs más grande (lg)
const centerButton = L.easyButton('fas fa-crosshairs fa-lg', function () {
    map.locate({ setView: true, maxZoom: 16 });
}).addTo(map);

