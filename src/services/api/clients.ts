import axios from "../lib/axios";
import type { Clients } from "../types/clients";

export const CLIENTS_API = "/api/clients";

export const getClients = async (): Promise<Clients[]> => {
  try {
    const response = await axios.get<Clients[]>(CLIENTS_API);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};