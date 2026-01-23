import api from "./api";

const AuthService = {
  // ------------------------
  // REGISTER
  // ------------------------
  register: async (name, email, password) => {
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: password, // backend Laravel
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ------------------------
  // LOGIN
  // ------------------------
  login: async (email, password) => {
    try {
      const res = await api.post("/login", { email, password });
      const token = res.data.access_token || res.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ------------------------
  // LOGOUT
  // ------------------------
  logout: async () => {
    try {
      await api.post("/logout"); // si backend attend POST /logout
    } catch (error) {
      // ignore
    } finally {
      localStorage.removeItem("token");
    }
  },

  // ------------------------
  // GET CURRENT USER
  // ------------------------
  getMe: async () => {
    try {
      const res = await api.get("/me");
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ------------------------
  // FORGOT PASSWORD
  // ------------------------
  forgotPassword: async (email) => {
    try {
      const res = await api.post("/forgot-password", { email });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ------------------------
  // RESET PASSWORD
  // ------------------------
  resetPassword: async (data) => {
    try {
      const res = await api.post("/reset-password", data);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default AuthService;
