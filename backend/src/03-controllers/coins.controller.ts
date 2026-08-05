import { Request, Response, NextFunction } from "express";
import * as coinsService from "../04-services/coins.service.js";
import { GetMarketsInput, GetCoinDetailInput, SearchInput } from "../06-validations/coin.validation.js";

export const getMarkets = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            vs_currency,
            order,
            per_page,
            page,
            sparkline,
        } = req.query as unknown as GetMarketsInput;

        const result = await coinsService.getMarkets(
            vs_currency,
            order,
            per_page,
            page,
            sparkline
        );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getCoinDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { coinId } = req.params as unknown as GetCoinDetailInput;
        const result = await coinsService.getCoinDetail(coinId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getGlobalData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await coinsService.getGlobalData();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getTrendingCoins = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await coinsService.getTrendingCoins();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const search = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { query } = req.query as unknown as SearchInput;
        const result = await coinsService.search(query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};