import { apiClient } from "../apiClient";

export const getMe = async () => {
  const res = await apiClient.get("/me");
  return res;
};

export const loginUser = async (email, password) => {
  const res = await apiClient.post("/auth/login", { email, password });
  return res;
};

export const logoutUser = async () => {
  const res = await apiClient.post("/auth/logout");
  return res;
};

export const registerUser = async (username, email, password) => {
  const res = await apiClient.post("/users", { username, email, password });
  return res;
};
