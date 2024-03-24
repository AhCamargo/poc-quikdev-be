import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PermissionController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { rules } = req.body;
    try {
      const existingPermission = await prisma.permission.findUnique({
        where: { id },
      });

      if (!existingPermission) {
        return res.status(404).json({ error: "Permissão não encontrada" });
      }

      const updatedPermission = await prisma.permission.update({
        where: { id },
        data: { rules },
      });

      res.status(200).json(updatedPermission);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar a permissão" });
    }
  }
}
