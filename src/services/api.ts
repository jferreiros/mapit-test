import axios from "axios";
import type { Bike } from "../types/Bike";

const API_BASE_URL = "https://fake.prod.mapit.me";

export async function getBikesAPI(): Promise<Bike[]> {
  const response = await axios.get<Bike[]>(`${API_BASE_URL}/motos`);
  return response.data;
}

export async function getBikeByIdAPI(id: string): Promise<Bike> {
  const response = await axios.get<Bike>(`${API_BASE_URL}/motos/${id}`);
  return response.data;
}
