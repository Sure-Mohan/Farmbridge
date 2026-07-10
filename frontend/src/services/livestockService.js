import api from "./api";

export const livestockService = {

    getAll: async () => {

        const response = await api.get("/livestock");

        return response.data.data || response.data || [];

    },

    getById: async (id) => {

        const response = await api.get(`/livestock/${id}`);

        return response.data.data || response.data;

    },

    create: async (animal) => {

        const response = await api.post("/livestock", animal);

        return response.data;

    },

    update: async (id, animal) => {

        const response = await api.put(`/livestock/${id}`, animal);

        return response.data;

    },

    delete: async (id) => {

        const response = await api.delete(`/livestock/${id}`);

        return response.data;

    }

};