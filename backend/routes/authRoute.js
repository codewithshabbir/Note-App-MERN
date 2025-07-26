import express from "express"
import { signin, signOut, signup } from "../controller/authController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", verifyToken, signOut)

export default router;