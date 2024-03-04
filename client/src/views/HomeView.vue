<script setup>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";

import redMarker from "../assets/map-marker-red.svg";
import blueMarker from "../assets/map-marker-blue.svg";

import GeoErrorModal from "@/components/GeoErrorModal.vue";
import MapFeatures from "@/components/MapFeatures.vue";

const coords = ref(null);
const fetchCoords = ref(false);
const geoMarker = ref(null);

const geoError = ref(null);
const geoErrorMessage = ref("");

const searchResults = ref(null);
const resultsMarker = ref(null);

let map;

//----------------------------------INITIAL PLOTTING------------------------------------------

onMounted(() => {
  // init map
  map = leaflet.map("map").setView([28.538336, -81.379234], 10);
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

  map.on("moveend", () => {
    closeSearchResults();
  });
  getGeoLocation();
});

const getGeoLocation = () => {
  if (coords.value) {
    coords.value = null;
    sessionStorage.removeItem("coords");
    map.removeLayer(geoMarker.value);
    return;
  }
  // check session storage for coords
  if (sessionStorage.getItem("coords")) {
    coords.value = JSON.parse(sessionStorage.getItem("coords"));
    plotGeoLocation(coords.value);
    return;
  }
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

//----------------------------------ERROR HANDLING------------------------------------------

const getLocError = (error) => {
  fetchCoords.value = null;
  geoError.value = true;
  geoErrorMessage.value = error.message;
};
const closeGeoError = () => {
  geoError.value = null;
  geoErrorMessage.value = null;
};

//----------------------------------SEARCH HANDLING------------------------------------------

const plotResult = (coords) => {
  // Check for resultMarker value
  if (resultsMarker.value) {
    map.removeLayer(resultsMarker.value);
  }
  //  create custom marker
  const customMarker = leaflet.icon({
    iconUrl: blueMarker,
    iconSize: [35, 35],
  });

  //create new marker with coords and custom icon
  resultsMarker.value = leaflet
    .marker([coords.coordinates[1], coords.coordinates[0]], {
      icon: customMarker,
    })
    .addTo(map);

  // set map view to current location
  map.setView([coords.coordinates[1], coords.coordinates[0]], 14);

  closeSearchResults();
};
const removeResult = () => {
  map.removeLayer(resultsMarker.value);
};
const toggleSearchResults = () => {
  searchResults.value = !searchResults.value;
};
const closeSearchResults = () => {
  searchResults.value = null;
};
</script>

<template>
  <div class="h-screen relative">
    <GeoErrorModal
      @closeGeoError="closeGeoError"
      v-if="geoError"
      :geoErrorMessage="geoErrorMessage"
    />
    <MapFeatures
      @getGeoLocation="getGeoLocation"
      @plotResult="plotResult"
      @toggleSearchResults="toggleSearchResults"
      @removeResult="removeResult"
      :coords="coords"
      :fetchCoords="fetchCoords"
      :searchResults="searchResults"
    />
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<style scoped></style>
