import { user } from "@prisma/client";
import { prisma } from "../postgres/database";

export async function getComment(comment_id: string) {
  const result = await prisma.comment.findFirst({
    where: { id: comment_id },
  });
  return result;
}

export async function createComment(blueprint_page_id: string, user: user, body: string) {
  const result = await prisma.comment.create({
    data: {
      body,
      blueprint_page_id,
      user_id: user.id,
    },
  });
  return result;
}

export async function deleteComment(comment_id: string) {
  const result = await prisma.comment.delete({
    where: { id: comment_id },
  });
  return result;
}

export async function getComments(blueprint_page_id: string) {
  const result = await prisma.comment.findMany({
    where: {
      blueprint_page_id,
      reply_comment_id: null,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return result;
}
