import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SessionController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      res.status(404).json({ error: "E-mail ou senha inválidos!" });
      return;
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      res.status(404).json({ error: "E-mail ou senha inválidos!" });
      return;
    }

    const permission = await prisma.permission.findUnique({
      where: { id: user.permissionId },
    });

    const jwtPwd = process.env.JWT_PWD || "default-secret";

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        permissions: permission?.rules,
      },
      jwtPwd,
      {
        expiresIn: "8h",
      }
    );

    const userLogin = { id: user.id, email: user.email, name: user.name };

    return res.status(200).json({
      user: userLogin,
      token,
    });
  }

  async resetPassword(req: Request, res: Response) {
    const { email, newPassword } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return res.status(200).json({ message: "Senha redefinida com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao redefinir a senha" });
    }
  }
}
