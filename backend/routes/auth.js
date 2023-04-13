import express from "express";

const authRoutes = express.Router();

import { signup, login } from "../controllers/auth.js";

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

export default authRoutes;
