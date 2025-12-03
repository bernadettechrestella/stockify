import axios from "axios";

const instance = axios.create({
  baseURL: "https://stockify-production-1358.up.railway.app/api",
  withCredentials: true, // <-- penting untuk cookie refresh token
});

// intercept refresh token
let isRefreshing = false;
let pendingRequests = [];

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // access token expired
    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        const { data } = await instance.post("/auth/refresh");
        const accessToken = data.accessToken;

        // simpan ke memory global
        instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        pendingRequests.forEach((cb) => cb(accessToken));
        pendingRequests = [];
        isRefreshing = false;

        return instance(originalRequest);
      }

      // queue request
      return new Promise((resolve) => {
        pendingRequests.push((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(instance(originalRequest));
        });
      });
    }

    return Promise.reject(err);
  }
);

export default instance;
