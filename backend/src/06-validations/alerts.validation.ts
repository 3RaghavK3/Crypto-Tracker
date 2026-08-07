import { z } from "zod";

export const addAlertSchema = z.object({
  coin_id: z.string().trim().min(1, "Coin ID is required"),
  type: z.enum(["PRICE_ABOVE", "PRICE_BELOW"]),
  price: z.number().positive("Price must be a positive number"),
});

export const alertParamsSchema = z.object({
  coin_id: z.string().trim().min(1, "Coin ID is required"),
  type: z.enum(["PRICE_ABOVE", "PRICE_BELOW"]),
});

export const updateAlertBodySchema = z.object({
  price: z.number().positive("Price must be a positive number"),
});

export const deleteAlertSchema = alertParamsSchema;