import { Router } from 'express';
import { UserController } from '../controller/UserController';

export const userRoutes = Router();

// CRUD USERS
userRoutes.post("/api/user", new UserController().createUser);
userRoutes.get("/api/users", new UserController().getUsers);
userRoutes.get("/api/user/:id", new UserController().getUserById);
userRoutes.patch("/api/user/:id", new UserController().updateUser);
userRoutes.delete("/api/user/:id", new UserController().deleteUser);