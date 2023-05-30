import { ApiClient } from "./ApiClient";

export const uploadToCloudinary = async (photo: File) => {
  const apiClient = new ApiClient();
  const { signature, timestamp } = await apiClient.getCloudinarySignature();

  const formData = new FormData();
  if (photo) {
    formData.append("file", photo);
  }
  formData.append("signature", signature);
  formData.append("timestamp", `${timestamp}`);
  formData.append("api_key", `${import.meta.env.VITE_CLOUDINARY_API_KEY}`);

  const data = await apiClient.postCloudinaryUpload(formData);

  return data.secure_url;
};
