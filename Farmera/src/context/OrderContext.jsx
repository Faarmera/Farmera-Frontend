import axios from 'axios';

const BASE_URL = 'https://farmera-eyu3.onrender.com/api/v1/order';

const OrderContext = {
  createOrder: async (shippingAddress) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, { shippingAddress }, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create order' };
    }
  },

  getUserOrders: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch user orders' };
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${orderId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch order' };
    }
  },

  returnProduct: async (orderId, orderedItemId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/${orderId}/productId/${orderedItemId}/return`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to return product' };
    }
  },

  cancelOrder: async (orderId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/${orderId}/cancel`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to cancel order' };
    }
  }
};

export default OrderContext;