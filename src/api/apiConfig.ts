import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 35000,
  withCredentials: true,
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    if (response) {
      const errorData = response.data;
      if (response.status === 400 && errorData.error === "BAD_REQUEST") {
        console.error(`Error: ${errorData.message}`);
      } else if (response.status === 401) {
        console.error("Unauthorized: Access token is missing or invalid.");
      } else if (errorData.message) {
        console.error(`Unexpected error: ${errorData.message}`);
      }
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { apiInstance };
