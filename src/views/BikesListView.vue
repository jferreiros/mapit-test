<template>
  <div
    class="container flex flex-col h-screen items-center justify-start gap-4 mx-auto p-4"
  >
    <div class="flex w-full items-center mb-4">
      <button
        @click="goHome"
        class="bg-white text-gray-700 border-[1px] border-primary py-2 px-4 rounded hover:bg-gray-300 transition"
      >
        &larr; Volver
      </button>
      <h1 class="text-3xl flex-grow font-bold text-center">Mis Motos</h1>
    </div>
    <div v-if="loading" class="text-center">Cargando...</div>

    <div v-else-if="error" class="text-red-500 text-center mb-4">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="bikes.length === 0" class="text-center">
        No hay motos disponibles
      </div>
      <div v-else class="flex items-center justify-center gap-4 flex-wrap">
        <div
          v-for="bike in bikes"
          :key="bike.id"
          class="bg-white w-72 text-gray-900 rounded-lg shadow p-4 flex flex-col text-left"
        >
          <img
            src="https://placehold.co/600x400?text=Moto"
            alt="Imagen de moto"
            class="w-full h-48 object-cover rounded mb-4"
          />
          <h2 class="text-xl font-semibold mb-2">{{ bike.nombre }}</h2>
          <p class="text-gray-700">Id: {{ bike.id }}</p>
          <p class="text-gray-700 mb-1">Modelo: {{ bike.modelo }}</p>
          <button
            @click="goToDetail(bike.id)"
            class="bg-primary text-white py-2 px-4 mt-4 w-32 self-end rounded hover:bg-red-700 transition"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </div>

    <button
      class="bg-primary w-40 text-white py-2 px-4 rounded hover:bg-red-700 transition"
    >
      Agregar moto
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useBikeStore } from "../stores/bikeStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "BikesListView",
  setup() {
    const bikeStore = useBikeStore();
    const { bikes, loading, error } = storeToRefs(bikeStore);
    const router = useRouter();

    const goHome = () => {
      router.push({ name: "Home" });
    };

    onMounted(() => {
      bikeStore.fetchBikes();
      console.log("bikes fetched");
    });

    const goToDetail = (id: string) => {
      router.push({ name: "BikeDetail", params: { id } });
    };

    return {
      bikes,
      loading,
      error,
      goToDetail,
      goHome,
    };
  },
});
</script>
