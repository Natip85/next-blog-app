"use server";
import db from "@/db/db";
import { currentUser } from "@/lib/auth";

export const getArticlesByUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return { error: "No user found" };
    const articles = await db.article.findMany({
      where: { userId: user.id },
    });

    if (!articles) return null;

    const publishedArticles = articles.filter((article) => article.isPublished);
    const draftArticles = articles.filter((article) => !article.isPublished);
    return { success: { publishedArticles, draftArticles } };
  } catch (error: any) {
    throw new Error(error);
  }
};
