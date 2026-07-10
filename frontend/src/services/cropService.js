import api from "./api";

export const cropService = {

    getAll: async () => {

        const response = await api.get("/crops");

        return response.data.data || response.data || [];

    },

    getById: async (id) => {

        const response = await api.get(`/crops/${id}`);

        return response.data.data || response.data;

    },

    create: async (crop) => {

        const response = await api.post("/crops", crop);

        return response.data;

    },

    update: async (id, crop) => {

        const response = await api.put(`/crops/${id}`, crop);

        return response.data;

    },

    delete: async (id) => {

        const response = await api.delete(`/crops/${id}`);

        return response.data;

    }

};