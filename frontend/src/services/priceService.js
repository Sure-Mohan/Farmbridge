import api from "./api";


export const priceService = {


  getMarketPrice: async (crop) => {

    const response = await api.get(
      `/price?crop=${crop}`
    );

    return response.data;

  }


};