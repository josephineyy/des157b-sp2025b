(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([38.5, -121.55],11)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

    var marker = L.marker([38.542134, -121.771205]).addTo(map);
    var circle = L.circle([38.404174, -121.430799],{
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 800
    }).addTo(map);
    var polygon = L.polygon([
    [38.487611, -121.351168],
    [38.487611, -121.39],
    [38.5, -121.38]
    ]).addTo(map);
    marker.bindPopup("This is my apartment");
    circle.bindPopup("Where I adopted Mochi :)");
    polygon.bindPopup("My Favorite Dining Hall.");
    // var popup = L.popup()
    // .setLatLng([38.542134, -121.771205])
    // .setContent("I am a standalone popup.")
    // .openOn(map);


}());