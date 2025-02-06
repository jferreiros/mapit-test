<template>
  <div class="min-h-screen bg-white flex flex-col p-0">
    <header class="bg-white container text-gray-950 p-4 flex items-center">
      <img src="../assets/logo.png" alt="Company Logo" class="h-8 w-30 mr-4" />
      <h1 class="text-xl font-bold">Vende tu moto</h1>
    </header>

    <main class="flex-grow bg-black">
      <router-view />
    </main>

    <footer class="bg-gray-100 text-gray-900 text-center p-4">
      &copy; {{ new Date().getFullYear() }} Mapit. All rights reserved.
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
});
</script>
