"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface PublishArticleFormProps {
  article: any;
}
const PublishArticleForm = ({ article }: PublishArticleFormProps) => {
  console.log({ article });

  return (
    <div className="flex items-center justify-between gap-5 p-10">
      <div className="flex-1 flex flex-col gap-5">
        <div className="font-bold">Article preview</div>
        <div>
          {article.blocks.map((item: any) => {
            return JSON.stringify(item.data);
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5">
        <div>
          Publishing to: <span className="font-bold">Nati Peretz</span>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="category" className="text-xs">
            Add a topics so readers know what your story is about
          </label>
          <Input placeholder="Add a topic..." className="rounded-none" />
        </div>
        <div>
          <Button
            size={"sm"}
            className="bg-green-600 rounded-3xl hover:bg-green-700"
          >
            Publish now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishArticleForm;
