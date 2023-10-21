import express from "express";

import homeController from "../controllers/home.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import authRoute from "./auth.route.js";
import adminRoute from "./admin.route.js";

const router = express.Router();

router.use(authMiddleware.validateJwt);

router.use(authRoute);
router.use(adminRoute);
router.get("/", homeController.getHome);

export default router;
