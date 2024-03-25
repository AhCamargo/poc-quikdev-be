import { Router } from "express";
import { CommentController } from "../controller/CommentController";

export const commentRoutes = Router();

// Comments
commentRoutes.post("/api/comment", new CommentController().createComment);
commentRoutes.get("/api/comment/:id", new CommentController().getCommentById);
commentRoutes.patch("/api/comment/:id", new CommentController().updateComment);
commentRoutes.delete("/api/comment/:id", new CommentController().deleteComment);
