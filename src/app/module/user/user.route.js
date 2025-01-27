import { Router } from "express";
import { UserController } from "./user.controller.js";
import { validateUserData } from "./user.validation.js";
import validateRequest from "../../middleware/validateRequest.js";

const router = Router();

router.post("/", validateRequest(validateUserData), UserController.createUser);
router.get("/:id", UserController.getUserById);

export const UserRoutes = router;
