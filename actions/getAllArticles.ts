"use server";
import db from "@/db/db";
import { currentUser } from "@/lib/auth";

export const getAllArticles = async (page: number) => {
  try {
    const perPage = 2;
    const user = await currentUser();
    if (!user) return null;

    // Calculate the offset based on the page number
    const offset = (page - 1) * perPage;

    // Fetch articles with pagination from the database
    const articles = await db.article.findMany({
      skip: offset,
      take: perPage,
    });

    // Return the fetched articles
    return articles;
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    return null;
  }
};
