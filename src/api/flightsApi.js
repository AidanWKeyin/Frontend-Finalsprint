import { api } from "./axios.js";


export const flightsApi = {
  list: ({ airportId, type } = {}) => {
    const params = new URLSearchParams();
    if (airportId) params.set("airportId", airportId);
    if (type) params.set("type", type);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return api.get(`/api/flights${qs}`).then(r => r.data);
  },
  create: (payload) => api.post("/api/flights", payload).then(r => r.data),
  update: (id, payload) => api.put(`/api/flights/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/api/flights/${id}`),
};
