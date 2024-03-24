import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReportPostController {
  async getPostReport(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          views: true,
          likes: true,
          dislikes: true,
          comments: {
            select: {
              id: true,
              description: true,
            },
          },
        },
      });

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Error ao acessar o post report" });
    }
  }
}
