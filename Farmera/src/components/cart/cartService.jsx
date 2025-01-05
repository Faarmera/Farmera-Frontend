import axios from "axios";

const BASE_URL = "https://farmera-eyu3.onrender.com/api/v1/cart";

const cartService = {
  addToCart: async (products) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.post(`${BASE_URL}/add`, { products }, config);
  },
  getUserCart: async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.get(`${BASE_URL}/user`, config);
  },
  getAllCarts: async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.get(`${BASE_URL}/get/allCarts`, config);
  },
  deleteProductFromCart: async (productId, token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.post(`${BASE_URL}/delete`, { productId }, config);
  },
  decreaseProductFromCart: async (productId, token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.post(`${BASE_URL}/decrease`, { productId }, config);
  },
  clearCart: async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.post(`${BASE_URL}/clear`, {}, config);
  },
};

export default cartService;
