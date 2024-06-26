"use server";
import db from "@/db/db";
import { currentUser } from "@/lib/auth";

export const updateArticle = async (
  articleId: string,
  values: any,
  image: string | null
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "No user found" };
  }

  const existingArticle = await db.article.findUnique({
    where: { id: articleId },
  });
  if (!existingArticle) return { error: "No article found" };

  const updatedArticle = await db.article.update({
    where: { id: existingArticle.id },
    data: {
      editorData: { ...values },
      image: image,
    },
  });
  return { success: updatedArticle };
};
