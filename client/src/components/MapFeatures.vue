<script setup>
import { ref } from "vue";

console.log("test");
const props = defineProps({
  coords: {
    type: null,
    required: true,
  },
  fetchCoords: {
    type: null,
    required: true,
  },
});
console.log(props);

const searchQuery = ref(null);
const searchData = ref(null);
const queryTimeout = ref(null);

const search = () => {};
</script>

<template>
  <div
    class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-transparent"
  >
    <!-- Search -->
    <div class="relative flex-1 md:min-w[350px]">
      <!-- Input -->
      <input
        class="pl-9 pr-4 py-3 text-sm focus:outline-none w-full shadow-md rounded-md"
        type="text"
        placeholder="Start your search"
        v-model="searchQuery"
      />
      <!-- Search Icon -->
      <div class="absolute top-0 left-[8px] h-full flex items-center">
        <i class="fas fa-search"></i>
      </div>
      <!-- Search Results -->
      <div class="absolute mt-2 w-full">
        <!-- Results -->
        <div class="h-[200px] overflow-scroll bg-white rounded-md">
          <div
            class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white"
          >
            <i class="fa-solid fa-location-dot"></i>
            <p class="text-xs">Testing results</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Geolocation -->
    <div
      class="px-4 bg-white flex items-center shadow-md rounded-md min-h-[45px]"
      :class="{ 'bg-slate-600': coords }"
      @click="$emit('getGetLocation')"
    >
      <i
        class="fas fa-solid fa-location-arrow text-state-600 text-[18px]"
        :class="{
          'text-white': coords,
          'animate-pulse': fetchCoords,
        }"
      ></i>
    </div>
  </div>
</template>

<style scoped></style>
