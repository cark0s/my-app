// Importa Leaflet
import L from 'leaflet';

// Inicializa el mapa en un punto y nivel de zoom específicos
var map = L.map('map').setView([-25.483828, -54.672011], 20);

// Agrega una capa base de OpenStreetMap al mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Crea un control de capas
var layerControl = L.control.layers().addTo(map);

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
        layerControl.addOverlay(geojsonLayer, 'Bloque de aulas');
        geojsonLayer.addTo(map);
    });

