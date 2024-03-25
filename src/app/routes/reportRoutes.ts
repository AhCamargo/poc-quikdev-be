import { Router } from "express";
import { ReportPostController } from "../controller/ReportPostController";

export const reportRoutes = Router();

// Report
reportRoutes.get("/api/posts/report", new ReportPostController().getPostReport);
