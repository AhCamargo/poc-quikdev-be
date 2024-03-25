import { Router } from "express";
import { PermissionController } from "../controller/PermissionController";

export const permissionRoutes = Router();

// Permission
permissionRoutes.patch(
  "/api/permission/:id",
  new PermissionController().update
);
