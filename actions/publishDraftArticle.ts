"use server";

import db from "@/db/db";
import { currentUser } from "@/lib/auth";

export const publishDraftArticle = async (
  articleId: string,
  values: any,
  topicId: string | undefined,
  topic: string | undefined,
  previewSubtitle: string | undefined,
  image: string | undefined
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "No user found" };
  }
  if (!topic) {
    const existingArticle = await db.article.findFirst({
      where: { id: articleId },
    });
    if (!existingArticle) {
      return { error: "No category found" };
    }
    const updatedArticle = await db.article.update({
      where: { id: existingArticle.id },
      data: {
        editorData: { ...values },
        isPublished: true,
        previewSubtitle: previewSubtitle,
        image: image,
      },
    });
    return { success: updatedArticle };
  } else {
    const existingArticle = await db.article.findFirst({
      where: { id: articleId },
    });
    if (!existingArticle) return { error: "No article found" };
    if (existingArticle.categoryId) {
      const existingCategory = await db.category.update({
        where: { id: existingArticle.categoryId },
        data: { title: topic },
      });
      const updatedArticle = await db.article.update({
        where: { id: existingArticle.id },
        data: {
          editorData: { ...values },
          isPublished: true,
          categoryId: existingCategory.id,
          previewSubtitle: previewSubtitle,
          image: image,
        },
      });
      return { success: updatedArticle };
    } else {
      const newCategory = await db.category.create({
        data: { title: topic },
      });

      if (!newCategory) {
        return { error: "No category found" };
      }
      const updatedArticle = await db.article.update({
        where: { id: existingArticle.id },
        data: {
          editorData: { ...values },
          isPublished: true,
          categoryId: newCategory.id,
          previewSubtitle: previewSubtitle,
          image: image,
        },
      });
      return { success: updatedArticle };
    }
  }
};
