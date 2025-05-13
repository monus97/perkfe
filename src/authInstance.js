import axios from "axios";


const baseURL = process.env.REACT_APP_BASE_URL;

const authInstance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json", // default for JSON requests
  },
});
// const authInstance = axios.create({
//   baseURL: `http://localhost:5000`,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
authInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Check if it's a file upload and adjust headers
    if (
      config.data instanceof FormData ||
      (config.headers["Content-Type"] && config.headers["Content-Type"].includes("multipart/form-data"))
    ) {
      // Let browser set correct multipart boundaries
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default authInstance;
