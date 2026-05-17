import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { clearAccessToken, getAccessToken } from "@/shared/lib/access-token-store";
import { refreshAccessToken } from "@/shared/lib/auth-client/refresh-access-token";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const redirectToLogin = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.location.assign("/login");
};

export const applyAuthInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig | undefined;

      if (error.response?.status !== 401 || !originalRequest) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        clearAccessToken();
        redirectToLogin();

        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        redirectToLogin();

        return Promise.reject(refreshError);
      }
    }
  );
};
