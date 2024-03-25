import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../../config/resend";

const prisma = new PrismaClient();

export class CommentController {
  async getCommentById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const comment = await prisma.comment.findUnique({ where: { id } });

      if (!comment) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Erro ao acessar comentário" });
    }
  }

  async createComment(req: Request, res: Response) {
    const { description, userId, postId } = req.body;

    try {
      const comment = await prisma.comment.create({
        data: { description, userId, postId },
      });

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        await sendEmail(
          user.email,
          "Novo comentário",
          `<p>Você recebeu um <strong>novo comentário</strong> em sua postagem.</p>
          <br/>
          <p>${description}</p>
          `
        );
      }

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar comentário" });
    }
  }

  async updateComment(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, description } = req.body;

    try {
      const comment = await prisma.comment.findUnique({ where: { id } });

      if (!comment) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }

      if (comment.userId !== userId) {
        return res.status(403).json({
          error: "Você não tem permissão para editar este comentário",
        });
      }

      const updatedComment = await prisma.comment.update({
        where: { id },
        data: { description },
      });

      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: "Erro ao editar comentário" });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.body;

    try {
      const comment = await prisma.comment.findUnique({
        where: { id },
        include: { post: true },
      });

      if (!comment) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }

      if (comment.userId !== userId && comment.post.userId !== userId) {
        return res.status(403).json({
          error: "Você não tem permissão para excluir este comentário",
        });
      }

      const updatedComment = await prisma.comment.update({
        where: { id },
        data: { description: "[Removido]" },
      });

      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir comentário" });
    }
  }
}
