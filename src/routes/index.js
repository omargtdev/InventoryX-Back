import express from "express";

import authRoute from "./auth.route.js";
import homeController from "../controllers/home.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware.validateJwt);

router.use(authRoute);
router.get("/", homeController.getHome);

export default router;
