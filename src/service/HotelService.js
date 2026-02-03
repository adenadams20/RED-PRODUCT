import api from "./api";

const HotelService = {
  async getHotels() {
    const res = await api.get("/hotels");
    return res.data; // Laravel renvoie le tableau d'hôtels
  },

  async createHotel(data) {
    const formData = new FormData();
    formData.append("name", data.name || "");
    formData.append("address", data.address || "");
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("currency", data.currency || "");
    if (data.price !== "" && data.price !== null) formData.append("price", data.price);
    if (data.image instanceof File) formData.append("image", data.image);

    const res = await api.post("/hotels", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.hotel;
  },

  async updateHotel(id, data) {
    const formData = new FormData();
    formData.append("name", data.name || "");
    formData.append("address", data.address || "");
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("currency", data.currency || "");
    if (data.price !== "" && data.price !== null) formData.append("price", data.price);
    if (data.image instanceof File) formData.append("image", data.image);

    // Laravel nécessite _method=PUT pour les updates via POST
    formData.append("_method", "PUT");

    const res = await api.post(`/hotels/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.hotel;
  },

  async deleteHotel(id) {
    await api.delete(`/hotels/${id}`);
  },
};

export default HotelService;
