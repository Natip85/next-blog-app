"use client";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { OutputData } from "@editorjs/editorjs";

interface ArticleFormProps {
  article: any;
}
const ArticleEditor = dynamic(() => import("@/components/article/Editor"), {
  ssr: false,
});
const ArticleForm = ({ article }: ArticleFormProps) => {
  const [editordata, setEditorData] = useState<OutputData | null>(null);
  console.log({ editordata });

  return (
    <Suspense fallback={`Loading...`}>
      <ArticleEditor
        minHeight={500}
        placeholder="Let's write something awesome! 🌟"
        onSave={(data: any) => {
          setEditorData(data);
          let logDataString = JSON.stringify(data);
          localStorage.setItem("document", logDataString);
          //save data here!
        }}
      />
    </Suspense>
  );
};

export default ArticleForm;
