import { Request, Response, NextFunction } from "express";
import * as wishlistService from "../04-services/wishlist.service.js";
import * as coinRepo from "../05-repository/coins.repository.js";
import AppError from "../utils/AppError.js";

export const getWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError(401, "Unauthorized"));
    }
    const wishlist = await wishlistService.getWishlist(userId);
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};

export const addWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError(401, "Unauthorized"));
    }
    const { coin_id } = req.body;

    const exists = await coinRepo.coinExists(coin_id);
    if (!exists) {
      return next(new AppError(400, "Invalid coin ID. The coin does not exist."));
    }

    await wishlistService.addWishlist(userId, coin_id);

    res.status(201).json({ message: "Added to wishlist successfully" });
  } catch (error: any) {
    if (error.code === '23505') {
      return next(new AppError(409, "Coin is already in your wishlist."));
    }
    next(error);
  }
};

export const removeWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError(401, "Unauthorized"));
    }
    const { coin_id } = req.params;
    
    const isRemoved = await wishlistService.removeWishlist(userId, coin_id as string);

    if (!isRemoved) {
      return next(new AppError(404, "Item not found in wishlist"));
    }

    res.status(200).json({ message: "Removed from wishlist successfully" });
  } catch (error) {
    next(error);
  }
};
