import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const newRules = {
  USER: {},
};

const createPermission = async (rules: any) => {
  const permission = await prisma.permission.create({
    data: {
      rules,
    },
  });
  return permission;
};

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const userExists = await prisma.user.findUnique({
        where: { email: email },
      });

      if (userExists) {
        res.status(404).json({ error: "E-mail já existe" });
        return;
      }

      const hashPassword = await bcrypt.hash(password, 10);
      // Cria uma nova permissão
      const permission = await createPermission(newRules);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          permissionId: permission.id,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.json(usersWithoutPassword);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ error: "Error getting users" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const userFound = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userFound) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const { password: _, ...user } = userFound;

      res.json(user);
    } catch (error) {
      console.error("Error getting user by id:", error);
      res.status(500).json({ error: "Error getting user by id" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { name, email } = req.body;
      const user = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
      });
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log(user.permissionId);
      await prisma.user.delete({
        where: { id: userId },
      });

      await prisma.permission.delete({
        where: { id: user.permissionId },
      });

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" });
    }
  }
}

export default UserController;
