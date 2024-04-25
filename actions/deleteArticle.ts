"use server";

import db from "@/db/db";
import { currentUser } from "@/lib/auth";

export const deleteArticle = async (articleId: string | undefined) => {
  try {
    if (!articleId) return { error: "No article id found" };
    const user = currentUser();
    if (!user) return { error: "No user found" };
    await db.article.delete({
      where: { id: articleId },
    });
    return { success: "Article deleted" };
  } catch (error: any) {
    return { error: error.message };
  }
};
