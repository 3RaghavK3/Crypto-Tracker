import { z } from "zod";

export const addWishlistSchema = z.object({
  coin_id: z.string().trim().min(1, "Coin ID is required"),
});

export const deleteWishlistSchema = z.object({
  coin_id: z.string().trim().min(1, "Coin ID is required"),
});
