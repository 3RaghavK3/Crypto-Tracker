import { Router } from "express";
import * as wishlistController from "../03-controllers/wishlist.controller.js";
import { authenticate } from "../02-middleware/authenticate.js";
import validate from "../02-middleware/validation.js";
import {
  addWishlistSchema,
  deleteWishlistSchema,
} from "../06-validations/wishlist.validation.js";

const router = Router();

router.use(authenticate);

router.get("/", wishlistController.getWishlist);

router.post("/", validate(addWishlistSchema), wishlistController.addWishlist);

router.delete(
  "/:coin_id",
  validate(deleteWishlistSchema, "params"),
  wishlistController.removeWishlist
);

export default router;
