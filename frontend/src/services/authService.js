import api from "./api";

export const authService = {

    login: async(email,password)=>{

        const response = await api.post(

            "/auth/login",

            {

                email,

                password

            }

        );

        return response.data;

    },

    register: async(userData)=>{

        const response = await api.post(

            "/auth/register",

            userData

        );

        return response.data;

    },

    forgotPassword: async(email,newPassword)=>{

        const response = await api.post(

            "/auth/forgot-password",

            {

                email,

                newPassword

            }

        );

        return response.data;

    },

    changePassword: async(

        currentPassword,

        newPassword

    )=>{

        const response = await api.post(

            "/auth/change-password",

            {

                currentPassword,

                newPassword

            }

        );

        return response.data;

    }

};