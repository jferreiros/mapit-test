import { defineStore } from "pinia";
import { ref } from "vue";
import type { Bike } from "../types/Bike";
import { getBikesAPI, getBikeByIdAPI } from "../services/api";

export const useBikeStore = defineStore("bike", () => {
  const bikes = ref<Bike[]>([]);
  const bikeDetail = ref<Bike | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchBikes() {
    loading.value = true;
    error.value = null;
    try {
      bikes.value = await getBikesAPI();
    } catch (err) {
      error.value = "Failed to fetch bikes";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchBikeDetail(id: string) {
    loading.value = true;
    error.value = null;
    try {
      bikeDetail.value = await getBikeByIdAPI(id);
    } catch (err) {
      error.value = "Failed to fetch bike detail";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    bikes,
    bikeDetail,
    loading,
    error,
    fetchBikes,
    fetchBikeDetail,
  };
});
