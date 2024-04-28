import { getAllArticles } from "@/actions/getAllArticles";
import ArticleCard from "@/components/article/ArticleCard";
import ArticlesList from "@/components/article/ArticlesList";

export default async function FeedPage() {
  const allArticles = await getAllArticles(1);
  return (
    <div className="container">
      <ArticleCard articles={allArticles} />
      <ArticlesList />
    </div>
  );
}
