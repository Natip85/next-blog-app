"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
interface ArticleCardProps {
  articles: any;
}
const ArticleCard = ({ articles }: ArticleCardProps) => {
  return (
    <>
      {articles ? (
        articles.map((article: any) => (
          <Card key={article.id}>
            <CardContent className="flex flex-col items-center justify-center pb-96"></CardContent>
            <CardFooter className="text-center flex flex-col p-4">
              <CardTitle className="my-2">{article.name}</CardTitle>
              <CardDescription>{article.tagline}</CardDescription>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-xl font-bold">No articles available !! </div>
      )}
    </>
  );
};

export default ArticleCard;
