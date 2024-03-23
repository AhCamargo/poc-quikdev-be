import { Router } from "express";
import UserController from "./controller/UserController";
// import multer from "multer";

// import uploadsConfig from "../config/multer";

// const upload = multer(uploadsConfig);

export const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ data: "Olá mundo!" });
});

// import { PostController } from "./controller/PostController";

// const postController = new PostController();

// routes.post("/", upload.array("images"), postController.store);

// IN and OUT application
// routes.post("/api/login", new SessionController().login);
// routes.post("/api/reset-password", new SessionController().resetPassword);

// CRUD USERS
routes.post("/api/user", new UserController().createUser);
routes.get("/api/users", new UserController().getUsers);
routes.get("/api/user/:id", new UserController().getUserById);
routes.patch("/api/user/:id", new UserController().updateUser);
routes.delete("/api/user/:id", new UserController().deleteUser);
// routes.patch("/api/permission/:id", new PermissionController().update);
