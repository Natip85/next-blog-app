"use client";

import { User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import moment from "moment";
import { Badge } from "../ui/badge";
interface ArticleCardProps {
  articles: any;
}
const ArticleCard = ({ articles }: ArticleCardProps) => {
  console.log("card articles>>", articles);
  console.log(
    "card blocks>>",
    articles.map((item: any) => {
      return item.editorData;
    })
  );

  return (
    <>
      {articles.map((article: any) => (
        <Card key={article.id}>
          <CardContent className="p-5 h-[175px] overflow-hidden">
            <div className="flex items-center gap-2">
              <div>
                <Avatar>
                  <AvatarImage src={article?.user?.image} />
                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="font-medium">{article?.user?.name}</div>
              <div className="text-xs text-muted-foreground">
                · {moment(article.updatedAt).format("MMM D YYYY")}
              </div>
            </div>
            <div>
              {(article?.editorData as any)?.blocks.map((item: any) => {
                if (item.type === "header") {
                  const headerData = JSON.parse(item.data);
                  return (
                    <Link
                      href={`/article-details/${article.id}`}
                      key={item.id}
                      className="pt-2 font-bold hover:cursor-pointer"
                    >
                      <div>{headerData.text}</div>
                    </Link>
                  );
                }
                if (item.type === "paragraph") {
                  const textData = JSON.parse(item.data);
                  return (
                    <Link
                      href={`/article-details/${article.id}`}
                      key={item.id}
                      className="hover:cursor-pointer"
                    >
                      <div className="overfolw-hidden w-[550px] truncate">
                        {textData.text}
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Badge variant={"secondary"}>
              {articles?.category?.map((item: any) => {
                return item;
              })}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ArticleCard;
