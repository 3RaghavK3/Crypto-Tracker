import * as alertRepo from "../05-repository/alerts.repository.js";

export const addAlert = async (
  userId: number,
  coinId: string,
  type: string,
  price: number
) => {
  return await alertRepo.addAlert(userId, coinId, type, price);
};

export const updateAlert = async (
  userId: number,
  coinId: string,
  type: string,
  price: number
) => {
  return await alertRepo.updateAlert(userId, coinId, type, price);
};

export const deleteAlert = async (
  userId: number,
  coinId: string,
  type: string
) => {
  return await alertRepo.deleteAlert(userId, coinId, type);
};

export const getAlerts = async (userId: number) => {
  return await alertRepo.getAlertsForUser(userId);
};
