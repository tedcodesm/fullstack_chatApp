import express from "express";
import { protectedRoute } from "../middleware/auth.midleware.js";
import { getmessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users" , protectedRoute , getUsersForSidebar);
router.get("/:id" , protectedRoute , getmessages);
router.post("/send/:id",protectedRoute,sendMessage);

export default router