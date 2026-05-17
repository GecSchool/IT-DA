import { setAccessToken } from "@/shared/lib/access-token-store";
import { publicApiClient } from "@/shared/lib/public-api-client";

type AccessTokenResponse = {
  accessToken: string;
};

let refreshAccessTokenPromise: Promise<string> | null = null;

export const refreshAccessToken = async () => {
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
