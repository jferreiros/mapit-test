<template>
  <section class="relative">
    <div
      class="h-screen flex items-center justify-center bg-cover bg-center"
      style="background-image: url('../assets/hero-image.jpeg')"
    >
      <div
        class="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center p-4"
      >
        <h2 class="text-white text-4xl font-bold mb-4 text-center">
          Bienvenido a Vende tu moto
        </h2>
        <p class="text-white text-lg mb-6 text-center">
          La aplicación para rastrear tus motos y obtener rápidamente un precio
          de recompra.
        </p>
        <input
          type="text"
          placeholder="Busca tu moto"
          class="mb-4 p-2 rounded w-3/4 max-w-md"
        />
        <div class="flex space-x-4">
          <button
            class="bg-secondary text-white px-6 py-3 rounded hover:bg-opacity-80 transition"
          >
            Añadir Moto
          </button>
          <router-link
            to="/bikes"
            class="bg-primary text-white px-6 py-3 rounded hover:bg-opacity-80 transition"
          >
            Ver mis Motos
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
