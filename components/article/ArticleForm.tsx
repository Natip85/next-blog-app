"use client";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { OutputData } from "@editorjs/editorjs";
import { Button } from "../ui/button";
import { INITIAL_DATA } from "@/lib/editorTools";

interface ArticleFormProps {
  article: any;
}
const ArticleEditor = dynamic(() => import("@/components/article/Editor"), {
  ssr: false,
});

const ArticleForm = ({ article }: ArticleFormProps) => {
  const router = useRouter();
  const [editorData, setEditorData] = useState<OutputData>(() => {
    const storedData = localStorage.getItem("document");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return INITIAL_DATA;
    }
  });

  const handleSaveEditor = () => {
    console.log({ editorData });
    localStorage.removeItem("document");
    router.push("/feed");
  };
  return (
    <div>
      <Button className="savebtn" onClick={handleSaveEditor}>
        Save
      </Button>
      {!article ? (
        <>
          <Suspense fallback={`Loading...`}>
            <ArticleEditor
              data={editorData}
              onChange={setEditorData}
              editorblock="editorjs-container"
            />
          </Suspense>
        </>
      ) : (
        <>fdfdfgfrr</>
      )}
    </div>
  );
};

export default ArticleForm;
