import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/shared/lib/access-token-store";
import { publicApiClient } from "@/shared/lib/public-api-client";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type AccessTokenResponse = {
  accessToken: string;
};

let refreshAccessTokenPromise: Promise<string> | null = null;

const refreshAccessToken = async () => {
  if (!refreshAccessTokenPromise) {
    refreshAccessTokenPromise = publicApiClient
      .post<AccessTokenResponse>("/auth/refresh")
      .then(({ data }) => {
        setAccessToken(data.accessToken);

        return data.accessToken;
      })
      .finally(() => {
        refreshAccessTokenPromise = null;
      });
  }

  return refreshAccessTokenPromise;
};

const redirectToLogin = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.location.assign("/login");
};

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
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

      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      redirectToLogin();

      return Promise.reject(refreshError);
    }
  }
);
