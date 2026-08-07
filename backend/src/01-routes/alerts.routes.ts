import { Router } from "express";
import * as alertController from "../03-controllers/alerts.controller.js";
import { authenticate } from "../02-middleware/authenticate.js";
import validate from "../02-middleware/validation.js";
import {
  addAlertSchema,
  updateAlertSchema,
  deleteAlertSchema,
} from "../06-validations/alerts.validation.js";

const router = Router();

router.use(authenticate);

router.get("/", alertController.getAlerts);

router.post("/", validate(addAlertSchema), alertController.addAlert);

router.patch("/", validate(updateAlertSchema), alertController.updateAlert);

router.delete("/", validate(deleteAlertSchema), alertController.deleteAlert);

export default router;
