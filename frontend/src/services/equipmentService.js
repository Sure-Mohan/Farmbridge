import api from "./api";

export const equipmentService = {

    getAll: async () => {

        const response = await api.get("/equipment");

        return response.data.data || response.data || [];

    },

    getById: async (id) => {

        const response = await api.get(`/equipment/${id}`);

        return response.data.data || response.data;

    },

    create: async (equipment) => {

        const response = await api.post("/equipment", equipment);

        return response.data;

    },

    update: async (id, equipment) => {

        const response = await api.put(`/equipment/${id}`, equipment);

        return response.data;

    },

    delete: async (id) => {

        const response = await api.delete(`/equipment/${id}`);

        return response.data;

    }

};