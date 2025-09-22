import axios from "axios";

export const api = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL,
     timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
     (config) => {
          // token
          const token =
               localStorage.getItem("token") ||
               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZTE1MjhjMC04MWJjLTRhNTctYTFiMC05ZmU0NTg2MGM2ZDAiLCJlbWFpbCI6InJvYmVydGhnbWVyQGdtYWlsLmNvbSIsIm5hbWUiOiJUSUVOREEgREUgUFJVRUJBUyIsImlhdCI6MTc1ODU0NzY5NiwiZXhwIjoxNzU4NTc2NDk2fQ.cwV3xt-D0IQ4BN3j5ViKuH8_Hhp-zR6-C1olOJn26qA";

          if (token) {
               if (!config.headers) {
                    config.headers = {};
               }
               config.headers.Authorization = `Bearer ${token}`;
          }

          return config;
     },
     (error) => {
          return Promise.resolve(error);
     }
);

// Add a response interceptor
api.interceptors.response.use(
     (response) => {
          return response;
     },
     (error) => {
          if (error.response?.status === 401) {
               // token expired
               console.warn("Unauthorized! Redirecting to login...");
               localStorage.removeItem("token");
               window.location.href = "/login";
          }

          // logs error dev
          if (process.env.NODE_ENV === "development") {
               console.error("API Error:", error.response || error.message);
          }

          return Promise.reject(error);
     }
);
