import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PostController {
  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany();

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Error ao tentar acessar todos posts" });
    }
  }
  async createPost(req: Request, res: Response) {
    try {
      const { userId, title, description } = req.body;
      const requestImages = req.files as Express.Multer.File[];

      const images = requestImages.map((image) => {
        return {
          path: image.filename,
        };
      });

      const post = await prisma.post.create({
        data: {
          userId,
          title,
          description,
          images: {
            create: images,
          },
        },
        select: {
          userId: true,
          title: true,
          description: true,
          images: true,
        },
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Error ao criar post" });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const { userId, title, description } = req.body;

      const post = await prisma.post.findUnique({ where: { id: postId } });

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }
      if (post.userId !== userId) {
        return res
          .status(403)
          .json({ error: "Você não está autorizado a editar este post" });
      }
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { title, description },
      });

      await prisma.postHistory.create({
        data: { postId, oldTitle: post.title, oldContent: post.description },
      });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: "Error ao editar post" });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const { userId } = req.body;
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }
      if (post.userId !== userId) {
        return res
          .status(403)
          .json({ error: "Você não está autorizado a editar este post" });
      }
      await prisma.post.delete({ where: { id: postId } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error ao deletar post" });
    }
  }

  async incrementViews(req: Request, res: Response) {
    const postId = req.params.id;

    try {
      const post = await prisma.post.update({
        where: { id: postId },
        data: {
          views: {
            increment: 1,
          },
        },
      });

      res.status(200).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao incrementar as visualizações da postagem" });
    }
  }

  async incrementLikes(req: Request, res: Response) {
    const postId = req.params.id;

    try {
      const post = await prisma.post.update({
        where: { id: postId },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      res.status(200).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao incrementar as curtidas da postagem" });
    }
  }

  async incrementDislikes(req: Request, res: Response) {
    const postId = req.params.id;

    try {
      const post = await prisma.post.update({
        where: { id: postId },
        data: {
          dislikes: {
            increment: 1,
          },
        },
      });

      res.status(200).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao incrementar as não curtidas da postagem" });
    }
  }
}
