import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import ImageLayer from 'ol/layer/Image.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';
import ImageWMS from 'ol/source/ImageWMS.js';
import LayerSwitcher from 'ol-layerswitcher'; // Importa LayerSwitcher

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      title: 'OSM'
    }), 
    new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8095/geoserver/prueba/wms',
        params: {
          LAYERS: 'prueba:area recretivas'
        },
        ratio: 1,
        serverType: 'geoserver',
      }),
      title: 'Área Recreativas' // Cambia el título para identificar la capa
    }),
    new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8095/geoserver/prueba/wms',
        params: {
          LAYERS: 'prueba:bloque de aulas'
        },
        ratio: 1,
        serverType: 'geoserver',
      }),
      title: 'Bloque de Aulas' // Cambia el título para identificar la capa
    }),
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([-54.672011, -25.483828]),
    zoom: 18
  })
});

// Agrega la barra lateral de control de capas
const layerSwitcher = new LayerSwitcher({
  tipLabel: 'Control de Capas'
});
map.addControl(layerSwitcher);


