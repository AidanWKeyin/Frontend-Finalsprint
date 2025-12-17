import { api } from "./axios";

export const airportsApi = {
  list: () => api.get("/api/airports").then(r => r.data),
  get: (id) => api.get(`/api/airports/${id}`).then(r => r.data),
  create: (payload) => api.post("/api/airports", payload).then(r => r.data),
  update: (id, payload) => api.put(`/api/airports/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/api/airports/${id}`),
};
