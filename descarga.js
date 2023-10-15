//descarga de metadatos
function descargarMetadatos(formato) {
    const seleccionado = document.getElementById('geojsonFiles');
    const urlGeoJSON = seleccionado.options[seleccionado.selectedIndex].value;

    fetch(urlGeoJSON)
        .then(response => response.json())
        .then(data => {
            if (formato === 'json') {
                descargarComoJSON(data);
            } else if (formato === 'csv') {
                // Implementa la conversión a CSV aquí y llama a descargarComoCSV
                // Ejemplo: descargarComoCSV(dataConvertidoACSV);
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo GeoJSON:', error);
        });
}

// descarga en otro formato 

function descargarComoCSV() {
    const seleccionado = document.getElementById('geojsonFiles');
    const urlGeoJSON = seleccionado.options[seleccionado.selectedIndex].value;

    fetch(urlGeoJSON)
        .then(response => response.json())
        .then(data => {
            const dataConvertidoACSV = convertirGeoJSONaCSV(data);
            descargarCSV(dataConvertidoACSV);
        })
        .catch(error => {
            console.error('Error al cargar el archivo GeoJSON:', error);
        });
}


function descargarCSV(dataConvertidoACSV) {
    const blob = new Blob([dataConvertidoACSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'metadatos.csv';
    enlace.click();
}

function convertirGeoJSONaCSV(data) {
    const features = data.features;
    let csv = 'Nombre,Coordenadas\n';

    for (let i = 0; i < features.length; i++) {
        const properties = features[i].properties;
        const nombre = properties.Nombre || ''; // Asegúrate de que "Nombre" esté definido
        const coordenadas = JSON.stringify(features[i].geometry.coordinates); // Obtenemos las coordenadas
        csv += nombre + ',' + coordenadas + '\n';
    }

    return csv;
}

