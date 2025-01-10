const axiosInstance = axios.create({
    baseURL: "https://farmera-eyu3.onrender.com/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
export default axiosInstance;