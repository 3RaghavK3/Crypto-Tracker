import * as wishlistRepo from "../05-repository/wishlist.repository.js";

export const getWishlist = async (userId: number) => {
  return await wishlistRepo.getWishlistForUser(userId);
};

export const addWishlist = async (userId: number, coinId: string) => {
  await wishlistRepo.addWishlist(userId, coinId);
};

export const removeWishlist = async (userId: number, coinId: string) => {
  return await wishlistRepo.removeWishlist(userId, coinId);
};
