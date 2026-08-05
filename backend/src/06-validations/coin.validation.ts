import { z } from "zod";

export const getMarketsSchema = z.object({
    vs_currency: z.string().default("usd"),

    order: z.enum([
        "market_cap_asc",
        "market_cap_desc",
        "volume_asc",
        "volume_desc",
        "id_asc",
        "id_desc",
    ]).default("market_cap_desc"),

    per_page: z.coerce
        .number()
        .int()
        .min(1)
        .max(250)
        .default(100),

    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    sparkline: z
        .enum(["true", "false"])
        .default("false")
        .transform((value) => value === "true"),
});

export const getCoinDetailSchema = z.object({
    coinId: z.string().min(1),
});

export const searchSchema = z.object({
    query: z.string().min(1),
});

export type GetMarketsInput = z.infer<typeof getMarketsSchema>;
export type GetCoinDetailInput = z.infer<typeof getCoinDetailSchema>;
export type SearchInput = z.infer<typeof searchSchema>;