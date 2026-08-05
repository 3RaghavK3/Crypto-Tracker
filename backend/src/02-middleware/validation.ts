import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import AppError from "../utils/AppError.js";

const validate =
  (
    schema: z.ZodType,
    source: "body" | "query" | "params" = "body"
  ) =>
    (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req[source]);

      if (!result.success) {
        return next(new AppError(400, result.error.issues[0].message));
      }

      Object.defineProperty(req, source, {
        value: result.data,
        writable: true,
        enumerable: true,
        configurable: true
      });

      next();
    };

export default validate;