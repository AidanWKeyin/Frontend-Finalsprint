import { api } from "./axios";

export const aircraftApi = {
  list: () => api.get("/api/aircraft").then(r => r.data),
  create: (payload) => api.post("/api/aircraft", payload).then(r => r.data),
  update: (id, payload) => api.put(`/api/aircraft/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/api/aircraft/${id}`),
};
