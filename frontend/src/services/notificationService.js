import axios from "axios";

const API = "http://localhost:5000/api/notifications";

export const notificationService = {

    async getNotifications() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(API, {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            return response.data;

        }

        catch (error) {

            console.error(error);

            throw error;

        }

    }

};