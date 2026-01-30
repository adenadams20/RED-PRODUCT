import api from "./api"; // axios configuré avec token ou baseURL
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const HotelService = {
  async getHotels() {
    const res = await api.get("/hotels");
    return res.data;
  },

  async createHotel(data) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== "" && key !== "preview") {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (key !== "image") {
          formData.append(key, value);
        }
      }
    });

    const res = await api.post("/hotels", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  async updateHotel(id, data) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== "" && key !== "preview") {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (key !== "image") {
          formData.append(key, value);
        }
      }
    });

    // Laravel: PUT via POST + _method
    const res = await api.post(`/hotels/${id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  async deleteHotel(id) {
    await api.delete(`/hotels/${id}`);
  },
};

export default HotelService;
