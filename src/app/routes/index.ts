import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../config/swagger_documentation.json";

import { userRoutes } from "./userRoutes";
import { sessionRoutes } from "./sessionRoutes";
import { permissionRoutes } from "./permissionRoutes";
import { postRoutes } from "./postRoutes";
import { commentRoutes } from "./commentRoutes";
import { reportRoutes } from "./reportRoutes";

export const routes = Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes.use(sessionRoutes);
routes.use(userRoutes);
routes.use(permissionRoutes);
routes.use(postRoutes);
routes.use(commentRoutes);
routes.use(reportRoutes);
