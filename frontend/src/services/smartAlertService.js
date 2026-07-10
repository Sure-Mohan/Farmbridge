import api from "./api";

export const smartAlertService = {

    getAlerts: async () => {

        const response = await api.get("/smart-alerts");

        return response.data;

    }

};