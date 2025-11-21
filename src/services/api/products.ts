import axios from "../lib/axios";
import type { products } from "../types/products";

export const PRODUCTS_API = "/api/products";

export const getProducts = async (): Promise<products[]> => {
  try {
    const response = await axios.get<products[]>(PRODUCTS_API);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
