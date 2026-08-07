import { Request, Response, NextFunction } from "express";
import * as alertService from "../04-services/alerts.service.js";
import AppError from "../utils/AppError.js";

export const getAlerts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError(401, "Unauthorized"));
    }
    const alerts = await alertService.getAlerts(userId);
    res.status(200).json(alerts);
  } catch (error) {
    next(error);
  }
};

export const addAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError(401, "Unauthorized"));
    }
    const { coin_id, type, price } = req.body;
    await alertService.addAlert(userId, coin_id, type, price);

    res.status(201).json({ message: "Alert added successfully" });
  } catch (error: any) {
    if (error.code === '23505') {
      return next(new AppError(409, "Duplicate alert exists. Please update or delete it instead."));
    }
    if (error.code === '23503') {
      return next(new AppError(400, "Invalid coin ID. The coin does not exist."));
    }
    next(error);
  }
};

export const updateAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError(401, "Unauthorized"));
    }
    const { coin_id, type } = req.params;
    const { price } = req.body;
    const isUpdated = await alertService.updateAlert(userId, coin_id as string, type as string, price);

    if (!isUpdated) {
      return next(new AppError(404, "Alert not found"));
    }

    res.status(200).json({ message: "Alert updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError(401, "Unauthorized"));
    }
    const { coin_id, type } = req.params;
    const isDeleted = await alertService.deleteAlert(userId, coin_id as string, type as string);

    if (!isDeleted) {
      return next(new AppError(404, "Alert not found"));
    }

    res.status(200).json({ message: "Alert deleted successfully" });
  } catch (error) {
    next(error);
  }
};
