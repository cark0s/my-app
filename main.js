// Importa Leaflet
import L from 'leaflet';

// Inicializa el mapa en un punto y nivel de zoom específicos
var map = L.map('map').setView([-25.483828, -54.672011], 20);

// Agrega una capa base de OpenStreetMap al mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Carga y agrega el archivo GeoJSON al mapa
fetch('geojson/arearecreativa.geojson')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var geojsonLayer = L.geoJSON(data).addTo(map);
        var layerControl = L.control.layers(null, { 'Area recreativas': geojsonLayer }).addTo(map);
        document.getElementById('layerControl').appendChild(layerControl.onAdd(map));
    });
