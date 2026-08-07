import { z } from "zod";

export const addAlertSchema = z.object({
  coin_id: z.string({
    required_error: "Coin ID is required",
  }),
  type: z.enum(["PRICE_ABOVE", "PRICE_BELOW"], {
    required_error: "Type is required and must be PRICE_ABOVE or PRICE_BELOW",
    invalid_type_error: "Type must be PRICE_ABOVE or PRICE_BELOW",
  }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be a positive number"),
});

export const updateAlertSchema = addAlertSchema;

export const deleteAlertSchema = z.object({
  coin_id: z.string({
    required_error: "Coin ID is required",
  }),
  type: z.enum(["PRICE_ABOVE", "PRICE_BELOW"], {
    required_error: "Type is required",
  }),
});
