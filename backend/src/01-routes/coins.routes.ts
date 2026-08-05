import { Router } from "express";
import * as coinsController from "../03-controllers/coins.controller.js";
import validate from "../02-middleware/validation.js";
import {
    getMarketsSchema,
    searchSchema,
    getCoinDetailSchema,
} from "../06-validations/coin.validation.js";

const router = Router();

router.get(
    "/markets",
    validate(getMarketsSchema, "query"),
    coinsController.getMarkets
);
router.get("/global", coinsController.getGlobalData);
router.get("/trending", coinsController.getTrendingCoins);
router.get(
    "/search",
    validate(searchSchema, "query"),
    coinsController.search
);
router.get(
    "/:coinId",
    validate(getCoinDetailSchema, "params"),
    coinsController.getCoinDetail
);

export default router;