import axios from "axios";

const url = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/";

const api = axios.create({
  baseURL: url,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = {
  shortenUrl: (originalUrl: string) => api.post("/shorten", { originalUrl }),

  getAllUrls: () => api.get("/urls"),

  saveQrHistory: (content: string) => api.post("/qr/save", { content }),
  getAllQrHistory: () => api.get("/qr/history"),
};

export default api;
