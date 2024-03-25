import { Router } from "express";
import multer from "multer";
import { PostController } from "../controller/PostController";
import uploadsConfig from "../../config/multer";

const upload = multer(uploadsConfig);

export const postRoutes = Router();

// Posts
postRoutes.post(
  "/api/post",
  upload.array("images"),
  new PostController().createPost
);
postRoutes.get("/api/posts", new PostController().getAllPosts);
postRoutes.patch("/api/post/:id", new PostController().updatePost);
postRoutes.delete("/api/post/:id", new PostController().deletePost);

// Views, Like and Dislikes
postRoutes.patch(
  "/api/posts/:id/increment-views",
  new PostController().incrementViews
);

postRoutes.patch(
  "/api/posts/:id/increment-likes",
  new PostController().incrementLikes
);

postRoutes.patch(
  "/api/posts/:id/increment-dislikes",
  new PostController().incrementDislikes
);
