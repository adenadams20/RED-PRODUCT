import axios from "axios";

// ===========================
// INSTANCE AXIOS
// ===========================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter automatiquement le token JWT si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gestion centralisée des erreurs
const handleError = (error) => {
  if (error.response) {
    // Si le backend renvoie JSON
    return error.response.data?.message || error.response.data || "Erreur serveur";
  }
  return error.message || "Erreur inconnue";
};

// ===========================
// AUTHENTIFICATION
// ===========================

// Inscription
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.passwordConfirm,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Connexion
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Infos utilisateur connecté
export const getMe = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Déconnexion
export const logoutUser = async () => {
  try {
    const response = await api.post("/logout");
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ===========================
// PASSWORD RESET
// ===========================

// Demande de reset
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Reset mot de passe
export const resetPassword = async (data) => {
  try {
    const response = await api.post("/reset-password", {
      token: data.token,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirm,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ===========================
// HOTELS (public)
// ===========================
export const getHotels = async () => {
  try {
    const response = await api.get("/hotels");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ===========================
// PRODUCTS (CRUD JWT)
// ===========================
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createProduct = async (data) => {
  try {
    const response = await api.post("/products", data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export default api;
