import { api } from "./axios.js";


export const gatesApi = {
  list: (airportId) => {
    const qs = airportId ? `?airportId=${airportId}` : "";
    return api.get(`/api/gates${qs}`).then(r => r.data);
  },
  create: (payload) => api.post("/api/gates", payload).then(r => r.data),
  update: (id, payload) => api.put(`/api/gates/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/api/gates/${id}`),
};
