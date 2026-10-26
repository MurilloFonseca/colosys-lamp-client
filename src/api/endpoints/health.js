import { apiClient } from "../apiClient";

export const health = async () => {
  const res = await apiClient.get("/health");
  return res;
};
