"use client";

import { getAllArticles } from "@/actions/getAllArticles";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "../Spinner";
import ArticleCard from "./ArticleCard";

const ArticlesList = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  // const delay = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));
  // const loadMoreArticles = async () => {
  //   // Once the page 8 is reached repeat the process all over again.
  //   await delay(2000);
  //   const nextPage = (page % 7) + 1;
  //   // const newProducts = (await getAllArticles(nextPage)) ?? [];
  //   // setArticles((prevProducts: any[]) => [...prevProducts, ...newProducts]);
  //   setPage(nextPage);
  // };
  const loadMoreArticles = async () => {
    const nextPage = page + 1;
    const newArticles = await getAllArticles(nextPage);
    if (newArticles) {
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage(nextPage);
    }
  };
  useEffect(() => {
    if (inView) {
      console.log("triggered");

      loadMoreArticles();
    }
  }, [inView]);
  return (
    <>
      <ArticleCard articles={articles} />

      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
};

export default ArticlesList;
