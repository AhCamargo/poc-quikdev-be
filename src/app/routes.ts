import { Router } from "express";
import multer from "multer";

import { UserController } from "./controller/UserController";
import { SessionController } from "./controller/SessionController";
import { PermissionController } from "./controller/PermissionController";
import { PostController } from "./controller/PostController";
import { ReportPostController } from "./controller/ReportPostController";

import uploadsConfig from "../config/multer";
import { CommentController } from "./controller/CommentController";

const upload = multer(uploadsConfig);

export const routes = Router();

// Session
routes.post("/api/login", new SessionController().login);
routes.post("/api/reset-password", new SessionController().resetPassword);

// CRUD USERS
routes.post("/api/user", new UserController().createUser);
routes.get("/api/users", new UserController().getUsers);
routes.get("/api/user/:id", new UserController().getUserById);
routes.patch("/api/user/:id", new UserController().updateUser);
routes.delete("/api/user/:id", new UserController().deleteUser);

// Permission
routes.patch("/api/permission/:id", new PermissionController().update);

// Posts
routes.post(
  "/api/post",
  upload.array("images"),
  new PostController().createPost
);
routes.get("/api/posts", new PostController().getAllPosts);
routes.patch("/api/post/:id", new PostController().updatePost);
routes.delete("/api/post/:id", new PostController().deletePost);

// Views, Like and Dislikes
routes.patch(
  "/api/posts/:id/increment-views",
  new PostController().incrementViews
);

routes.patch(
  "/api/posts/:id/increment-likes",
  new PostController().incrementLikes
);

routes.patch(
  "/api/posts/:id/increment-dislikes",
  new PostController().incrementDislikes
);

// Comments
routes.post("/api/comment", new CommentController().createComment);
routes.get("/api/comment/:id", new CommentController().getCommentById);
routes.patch("/api/comment/:id", new CommentController().updateComment);
routes.delete("/api/comment/:id", new CommentController().deleteComment);

// Report
routes.get("/api/posts/report", new ReportPostController().getPostReport);
