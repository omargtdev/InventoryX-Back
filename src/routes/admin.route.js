import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.use(authMiddleware.validateUserAdmin);

router.get("/admin/users", adminController.getUsers);
router.post("/admin/users", adminController.createUser);
router.route("/admin/users/:userId")
	.get(adminController.getUser)
	.put(adminController.updateUser)
	.patch(adminController.changeStatusUser);

export default router;

