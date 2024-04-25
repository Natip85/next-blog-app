import { getArticleById } from "@/actions/getArticleById";
interface ArticleDetailsProps {
  params: {
    articleId: string;
  };
}
const ArticleDetails = async ({ params }: ArticleDetailsProps) => {
  const article = await getArticleById(params.articleId);
  console.log("articledetials>>>", article);

  return <div>ArticleDetails</div>;
};

export default ArticleDetails;
