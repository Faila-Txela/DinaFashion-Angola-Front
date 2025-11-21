import axios from "../lib/axios";
import type { Interation } from "../types/interation";

export const INTERATION_API = "/api/interacao";

export const getInterations = async (): Promise<Interation[]> => {
  try {
    const response = await axios.get<Interation[]>(INTERATION_API);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar interações:", error);
    throw error;
  }
};