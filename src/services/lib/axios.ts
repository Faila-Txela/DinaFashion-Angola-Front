import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3007/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
  // Se for erro de login, não limpa nem redireciona, deixa o componente tratar
  if (error.config.url.includes("/login")) {
    return Promise.reject(error);
  }

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  window.location.href = "/login"; 
}
  }
);

export default api;