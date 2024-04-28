import { getAllArticles } from "@/actions/getAllArticles";
import ArticleCard from "@/components/article/ArticleCard";
import ArticlesList from "@/components/article/ArticlesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function FeedPage() {
  const allArticles = await getAllArticles(1);
  console.log("Page articles>>>", allArticles);

  return (
    <div className="container flex p-10">
      <div className="flex-1">
        <Tabs defaultValue="drafts">
          <TabsList className="bg-transparent">
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
          <TabsContent value="drafts">
            <ArticleCard articles={allArticles} />
            <ArticlesList />
          </TabsContent>
          <TabsContent value="published">published here</TabsContent>
        </Tabs>
      </div>
      <div className="w-1/3">second part</div>
    </div>
  );
}
