import { apiClient } from "@/config";

export const AddProductApi = async (id, form) => {
  try {
    const response = await apiClient.post(`/add-item/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : null;
  }
};
