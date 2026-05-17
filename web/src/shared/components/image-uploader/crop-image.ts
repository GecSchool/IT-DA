import type { Area } from "react-easy-crop";

const createImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.crossOrigin = "anonymous";
    image.src = src;
  });

export async function getCroppedImageFile(
  sourceUrl: string,
  cropArea: Area,
  fileName: string,
  fileType: string
) {
  const image = await createImage(sourceUrl);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context is not available");
  }

  canvas.width = cropArea.width;
  canvas.height = cropArea.height;

  context.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    cropArea.width,
    cropArea.height
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error("Failed to crop image"));
          return;
        }

        resolve(result);
      },
      fileType || "image/jpeg",
      0.9
    );
  });

  return new File([blob], fileName, { type: blob.type });
}
