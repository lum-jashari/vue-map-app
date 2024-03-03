<script setup>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";

let map;
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
        attribution: '&copy; <a href="http://www.mapbox.com">OpenStreetMap</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: import.meta.env.VITE_API_KEY,
      }
    )
    .addTo(map);
});

const coords = ref(null);
const fetchCoord = ref(null);
</script>
<template>
  <div class="h-screen relative">
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<style scoped></style>
