<template>
  <div class="container mx-auto p-4 text-gray-950">
    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>
    <div v-if="bike" class="bg-white p-6 rounded-lg shadow">
      <div class="flex items-center mb-4">
        <button
          @click="goBack"
          class="bg-white text-gray-700 border-[1px] border-primary py-2 px-4 rounded hover:bg-gray-300 transition"
        >
          &larr; Volver
        </button>
        <h1 class="text-3xl flex-grow font-bold text-center">Ficha Técnica</h1>
      </div>
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/2">
          <img
            src="https://placehold.co/400x300?text=Moto"
            alt="Imagen de la moto"
            class="w-full h-auto rounded"
          />
        </div>
        <div class="md:w-1/2">
          <div class="flex justify-between items-center pb-8">
            <p class="text-2xl font-bold">
              <strong>{{ bike.nombre }}</strong>
            </p>
            <p><strong>ID:</strong> {{ bike.id }}</p>
          </div>

          <div class="divide-y divide-gray-200">
            <p class="py-2 flex justify-between">
              <strong>Modelo:</strong>
              <span>{{ bike.modelo }}</span>
            </p>
            <p class="py-2 flex justify-between">
              <strong>Precio de compra:</strong>
              <span>${{ bike.precioCompra }}</span>
            </p>
            <p class="py-2 flex justify-between">
              <strong>Valor de recompra:</strong>
              <span class="font-semibold">{{ formattedBuyBackPrice }}</span>
            </p>
            <p class="py-2 flex justify-between">
              <strong>Año de compra:</strong>
              <span>{{ bike.fechaCompra }}</span>
            </p>
          </div>

          <button
            @click="openConfirmationModal"
            class="mt-4 w-full bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition"
          >
            Solicitar cita
          </button>
          <div class="mt-4 flex gap-2">
            <button
              class="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
            >
              Ver historial
            </button>
            <button
              class="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
            >
              Compartir
            </button>
          </div>
        </div>
      </div>
      <div v-if="bike.coordenadas" class="mt-6">
        <h2 class="text-2xl font-semibold mb-2 text-left">Ubicación</h2>
        <MapboxMap
          :lat="bike.coordenadas.latitud"
          :lng="bike.coordenadas.longitud"
        />
      </div>
    </div>
    <ConfirmationModal v-if="showModal" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useBikeStore } from "../stores/bikeStore";
import { useRoute, useRouter } from "vue-router";
import ConfirmationModal from "../components/ConfirmationModal.vue";
import MapboxMap from "../components/MapboxMap.vue";
import { calculateBuyBackPrice } from "../utils/calcBuyBack";

export default defineComponent({
  name: "BikeDetailView",
  components: {
    ConfirmationModal,
    MapboxMap,
  },
  setup() {
    const bikeStore = useBikeStore();
    const route = useRoute();
    const router = useRouter();
    const showModal = ref(false);
    const bikeId = route.params.id as string;

    onMounted(() => {
      bikeStore.fetchBikeDetail(bikeId);
    });

    const bike = computed(() => bikeStore.bikeDetail);
    const loading = computed(() => bikeStore.loading);
    const error = computed(() => bikeStore.error);

    const goBack = () => {
      router.push({ name: "BikesList" });
    };

    const openConfirmationModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const formattedBuyBackPrice = computed(() => {
      if (bike.value && bike.value.precioCompra && bike.value.fechaCompra) {
        const price = calculateBuyBackPrice(
          bike.value.precioCompra,
          bike.value.fechaCompra
        );
        return `$${price.toFixed(2)}`;
      }
      return "N/A";
    });

    return {
      bike,
      loading,
      error,
      goBack,
      showModal,
      openConfirmationModal,
      closeModal,
      formattedBuyBackPrice,
    };
  },
});
</script>
