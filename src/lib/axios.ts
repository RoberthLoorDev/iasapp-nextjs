import axios from "axios";

export const api = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL,
     timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
     (config) => {
          // no agregar token en login
          if (!config.url?.includes("/auth")) {
               const token = localStorage.getItem("token");

               if (token) {
                    config.headers = {
                         ...config.headers,
                         Authorization: `Bearer ${token}`,
                    };
               }
          }

          return config;
     },
     (error) => {
          return Promise.resolve(error);
     }
);

// Add a response interceptor
api.interceptors.response.use(
     (response) => response,
     (error) => {
          const isLoginRequest = error.config?.url?.includes("/auth/login");

          if (error.response?.status === 401 && !isLoginRequest) {
               console.warn("Unauthorized! Redirecting to login...");
               localStorage.removeItem("token");
               window.location.href = "/login";
          }

          if (process.env.NODE_ENV === "development") {
               console.error("API Error:", error.response || error.message);
          }

          return Promise.reject(error);
     }
);

api.interceptors.request.use(
     (config) => {
          // no agregar token a login/register
          if (!config.url?.includes("/auth/")) {
               const token = localStorage.getItem("token");
               if (token) {
                    config.headers = {
                         ...config.headers,
                         Authorization: `Bearer ${token}`,
                    };
               }
          }
          return config;
     },
     (error) => Promise.reject(error)
);

api.interceptors.response.use(
     (response) => response,
     (error) => {
          if (process.env.NODE_ENV === "development") {
               console.error("❌ API Error:");
               console.error("URL:", error.config?.url);
               console.error("Method:", error.config?.method);
               console.error("Status:", error.response?.status);
               console.error("Data:", error.response?.data);
               console.error("Message:", error.message);
          }

          return Promise.reject(error);
     }
);
