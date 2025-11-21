import axios from "../lib/axios";
import type { userAdmin } from "../types/userAdmin";

export const ADMINS_API = "/api/admin";

export const getUserAdmins = async (): Promise<userAdmin[]> => {
  try {
    const token = localStorage.getItem("token"); // pega o token do login
    const response = await axios.get<userAdmin[]>(ADMINS_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar administradores:", error.response?.data || error);
    throw error;
  }
};