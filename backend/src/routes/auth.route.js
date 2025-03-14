import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.midleware.js";

const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.post("/signup", signup)
router.post("/login",login)
router.post("/logout", logout)
router.put("/update-profile", protectedRoute, updateProfile)
router.get("/check", protectedRoute, checkAuth)

export default router