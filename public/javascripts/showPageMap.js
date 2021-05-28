//const Campground = require("../../models/Campground");

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: campground.geometry.coordinates,
    zoom: 7
});

new mapboxgl.Marker()
    .setLngLat([-74.5, 40])
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
            .setHTML(
                '<h3>${campground.title}</h3>'
            )
    )
    .addTo(map)