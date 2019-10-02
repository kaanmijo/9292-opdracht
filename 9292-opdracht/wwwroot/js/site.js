mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fhbm1pam8iLCJhIjoiY2sxOWM4d28yMDhnaDNtcXdxZnR6b3U2ZSJ9.H37A8Aado71_eqif9h9xZg';

var geojson = {
    "type": "FeatureCollection",
    "features": []
};

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [4.8662, 52.0939],
    zoom: 6
});


$('#city').on('change', function () {
    // Do a async request to get the temperature
    $.ajax({
        url: "./home/getweather",
        method: "POST",
        data: "city=" + this.value,
        success: function (r) {
            var table = "#city-body";

            // Check if an item with the current ID is already there, if not, add it!
            console.log($("tr[data-id='" + r.id + "']").length);
            if ($("tr[data-id='" + r.id + "']").length !== 1) {
                // Fill the table with the retrieved data
                $(table).append("<tr data-id='" + r.id + "'>");
                $(table + " tr[data-id='" + r.id + "']").append("<td>" + r.name + "</td>");
                $(table + " tr[data-id='" + r.id + "']").append("<td>" + r.main.temp + "&deg;C</td>");
                $(table).append("</tr>");

                // Now order the table alphabetically
                var listitems = $(table).find('tr');
                listitems.sort(function (a, b) {
                    return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
                });

                // Append all the ordered data again
                $.each(listitems, function (idx, itm) {
                    $(table).append(itm);
                });

                geojson.features.push(
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [r.coord.lon, r.coord.lat]
                        },
                        "properties": {
                            "title": r.name,
                            "description": "<strong>" + r.name + "</strong> <p>" + r.main.temp + "&deg;C</p>"
                        }
                    }
                );

                map.getSource("markers").setData(geojson);
            }
        }
    });
});

// add markers to map
map.on("load", function () {
    // Image: An image is loaded and added to the map.
    map.loadImage("https://i.imgur.com/MK4NUzI.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-marker", image);
        // Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
        map.addLayer({
            id: "markers",
            type: "symbol",
            // Source: A data source specifies the geographic coordinate where the image marker gets placed. */
            source: {
                type: "geojson",
                data: geojson
            },
            layout: {
                "icon-image": "custom-marker",
            }
        });
    });
});

map.on('click', 'markers', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'markers', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'markers', function () {
    map.getCanvas().style.cursor = '';
});