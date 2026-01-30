import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const HotelService = {
  getHotels: async () => {
    const res = await axios.get(`${API_BASE_URL}/api/hotels`);
    return res.data;
  },

  createHotel: async (data) => {
    const res = await axios.post(`${API_BASE_URL}/api/hotels`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateHotel: async (id, data) => {
    const res = await axios.post(`${API_BASE_URL}/api/hotels/${id}?_method=PUT`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  deleteHotel: async (id) => {
    const res = await axios.delete(`${API_BASE_URL}/api/hotels/${id}`);
    return res.data;
  },
};

export default HotelService;
