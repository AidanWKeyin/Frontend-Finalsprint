import { api } from "./axios";

export const airlinesApi = {
  list: () => api.get("/api/airlines").then(r => r.data),
  create: (payload) => api.post("/api/airlines", payload).then(r => r.data),
  update: (id, payload) => api.put(`/api/airlines/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/api/airlines/${id}`),
};

