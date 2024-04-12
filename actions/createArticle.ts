"use server";
import db from "@/db/db";
import { currentUser } from "@/lib/auth";

export const createArticle = async (values: any, asPublished: boolean) => {
  console.log("vals>>>", values);
  console.log("Aspublished", asPublished);

  const user = await currentUser();
  if (!user) {
    return { error: "No user found" };
  }

  const article = await db.article.create({
    data: {
      editorData: { ...values },
      readTime: 1,
      userId: user.id,
      categoryId: "6615237c3d24caf8d6534449",
      isPublished: asPublished,
    },
  });
  return { success: article };
};
