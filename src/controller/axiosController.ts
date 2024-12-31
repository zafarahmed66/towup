import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define a type for your API response (You can adjust this based on your use case)
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

// Create an Axios instance with configuration
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL || "http://localhost:5437", // Default base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Optional)
api.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // Example: Add Authorization token to headers
    const cookiesValue = Cookies.get("token");
    const token = cookiesValue && JSON.parse(cookiesValue);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Optional)
api.interceptors.response.use(
  (response: AxiosResponse): any => {
    return response; // Simplifies response handling
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default api;

// Define and export reusable API functions with types
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return await api.get(url, config);
};

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return await api.post(url, data, config);
};

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return await api.put(url, data, config);
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return await api.delete(url, config);
};
