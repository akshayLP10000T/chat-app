import express from "express";
import { getOtherUsers, login, logOut, register } from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/").get(isAuthenticated ,getOtherUsers);

export default router;