<script setup>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import redMarker from "../assets/map-marker-red.svg";
import blueMarker from "../assets/map-marker-blue.svg";

let map;
onMounted(() => {
  const icon =
    // init map
    (map = leaflet.map("map").setView([28.538336, -81.379234], 10));
  // add tile layer
  leaflet
    .tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        attribution: '&copy; <a href="http://www.mapbox.com">MapBox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: import.meta.env.VITE_API_KEY,
      }
    )
    .addTo(map);
  getGeolocation();
});

const coords = ref(null);
const fetchCoords = ref(null);
const geoMarker = ref(null);

const getGeolocation = () => {
  fetchCoords.value = true;
  navigator.geolocation.getCurrentPosition(setCoords, getLocError);
};
const setCoords = (pos) => {
  // stop fetching coords
  fetchCoords.value = null;

  // set coords in session storage
  const setSessionCoords = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
  };
  sessionStorage.setItem("coords", JSON.stringify(setSessionCoords));

  //set ref coords value
  coords.value = setSessionCoords;

  plotGeoLocation(coords.value);
};
const getLocError = (error) => {
  console.log(error);
};

const plotGeoLocation = (coords) => {
  //  create custom marker
  const customMarker = leaflet.icon({
    iconUrl: redMarker,
    iconSize: [35, 35],
  });

  //create new marker with coords and custom icon
  geoMarker.value = leaflet
    .marker([coords.lat, coords.lng], { icon: customMarker })
    .addTo(map);

  // set map view to current location
  map.setView([coords.lat, coords.lng], 10);
};
</script>

<template>
  <div class="h-screen relative">
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<style scoped></style>
