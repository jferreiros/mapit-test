<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
  >
    <div class="bg-white text-gray-900 rounded-lg shadow-lg p-8">
      <p class="mb-6 text-lg font-semibold">
        ¿Está seguro de que desea solicitar una cita pata tu moto?
      </p>
      <button
        @click="confirm"
        class="bg-primary-500 text-white px-5 py-3 rounded-lg hover:bg-primary-600 transition duration-300"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmationModal",
  emits: ["close"],
  setup(_, { emit }) {
    const confirm = () => {
      emit("close");
    };
    return { confirm };
  },
});
</script>

<style scoped></style>
