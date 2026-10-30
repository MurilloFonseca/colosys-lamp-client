import { apiClient } from "../apiClient";

export const createLamp = async (deviceId, name) => {
  const res = await apiClient.post("/lamps", { name, device_id: deviceId });
  return res;
};

export const upsateThresholds = async (deviceId, thresholds) => {
  const res = await apiClient.put(`/lamps/${deviceId}/thresholds`, thresholds);
  return res;
};

export const getHistory = async (deviceId) => {
  const res = await apiClient.get(`/lamps/${deviceId}/history`);
  return res;
};
