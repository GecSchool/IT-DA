import { bffClient } from "@/shared/lib/bff-client";

type UploadImageParams = {
  domain: "dog" | "post";
};

type UploadImageResponse = {
  imageUrl: string;
};

export async function uploadImage(file: File, params: UploadImageParams): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("domain", params.domain);

  const { data } = await bffClient.post<UploadImageResponse>("/api/images", formData);

  return data;
}

export async function deleteImages(imageUrls: string[]) {
  if (imageUrls.length === 0) {
    return;
  }

  await bffClient.delete("/api/images", {
    data: { imageUrls },
  });
}
