import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/login", authController.getUserToken);
router.route("/auth/profile")
	.get(authController.getProfile)
	.put(authController.updateProfile);

export default router;
