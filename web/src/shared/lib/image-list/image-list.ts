export function getRemovedImageUrls(originalImageUrls: string[], finalImageUrls: string[]) {
  return originalImageUrls.filter((imageUrl) => !finalImageUrls.includes(imageUrl));
}

export function getUnusedUploadedImageUrls(uploadedImageUrls: string[], finalImageUrls: string[]) {
  return uploadedImageUrls.filter((imageUrl) => !finalImageUrls.includes(imageUrl));
}
