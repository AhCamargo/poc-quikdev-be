import { Router } from "express";
import { SessionController } from "../controller/SessionController";

export const sessionRoutes = Router();

// Session
sessionRoutes.post("/api/login", new SessionController().login);
sessionRoutes.post(
  "/api/reset-password",
  new SessionController().resetPassword
);
