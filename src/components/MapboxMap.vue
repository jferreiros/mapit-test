<template>
  <div class="h-64 w-full rounded">
    <div ref="mapContainer" class="w-[100%] h-64"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default defineComponent({
  name: "MapboxMap",
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const mapContainer = ref<HTMLDivElement | null>(null);
    let map: mapboxgl.Map | null = null;

    onMounted(() => {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
      if (mapContainer.value) {
        map = new mapboxgl.Map({
          container: mapContainer.value,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [props.lng, props.lat],
          zoom: 12,
        });

        map.on("load", () => {
          if (map) {
            map.resize();
            map.flyTo({ center: [props.lng, props.lat], zoom: 12 });
            new mapboxgl.Marker().setLngLat([props.lng, props.lat]).addTo(map);
          }
        });
      }
    });
    watch(
      () => [props.lng, props.lat],
      ([newLng, newLat]) => {
        if (map) {
          map.setCenter([newLng, newLat]);
        }
      }
    );

    return {
      mapContainer,
    };
  },
});
</script>
