// src/service/AuthService.js
import api from "./api";

const AuthService = {
  register: async (name, email, password) => {
    const res = await api.post("/register", {
      name,
      email,
      password,
      password_confirmation: password,
    });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  login: async (email, password, garderConnecte = true) => {
    const res = await api.post("/login", {
      email:email,
      password:password,
    });

    const token = res.data.token;

    if (token) {
      if (garderConnecte) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
    }

    return res.data;
  },

  logout: async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  },

  getMe: async () => {
    const res = await api.get("/user");
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await api.post("/forgot-password", { email });
    return res.data;
  },

  resetPassword: async (data) => {
    const res = await api.post("/reset-password", data);
    return res.data;
  },
};

export default AuthService;
