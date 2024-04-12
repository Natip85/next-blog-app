"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { OutputBlockData } from "@editorjs/editorjs";
import { Button } from "../ui/button";
import { INITIAL_DATA } from "@/lib/editorTools";
import { createArticle } from "@/actions/createArticle";
import { EditorTools } from "@/lib/editorTools";
import EditorJS from "@editorjs/editorjs";
const ArticleEditor = dynamic(() => import("@/components/article/Editor"), {
  ssr: false,
});
function convertToJSON(blocks: OutputBlockData[]) {
  return blocks.map((block) => ({
    id: block.id,
    type: block.type,
    data: JSON.stringify(block.data),
  }));
}
function convertFromJSON(blocks: any[]) {
  return blocks?.map((block: any) => ({
    ...block,
    data: typeof block.data === "string" ? JSON.parse(block.data) : block.data,
  }));
}
interface ArticleFormProps {
  article: any;
}

const ArticleForm = ({ article }: ArticleFormProps) => {
  const router = useRouter();
  const ref = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<any>(() => {
    const storedData = localStorage.getItem("document");
    return storedData ? JSON.parse(storedData) : INITIAL_DATA;
  });
  const [editEditorData, setEditEditorData] = useState<any>(() => {
    const storedData = localStorage.getItem("edit-document");
    return storedData
      ? JSON.parse(storedData)
      : {
          time: new Date().getTime(),
          blocks: convertFromJSON(article?.editorData.blocks),
        };
  });

  useEffect(() => {
    if (article) {
      if (!ref.current) {
        const editor = new EditorJS({
          holder: "edit-editor",
          tools: EditorTools,
          data: { ...editEditorData } || {
            time: new Date().getTime(),
            blocks: convertFromJSON(article.editorData.blocks),
          },
          async onChange(api, event) {
            const data = await api.saver.save();
            let logDataString = JSON.stringify(data);
            localStorage.setItem("edit-document", logDataString);
          },
        });
        ref.current = editor;
      }
    }
  }, [article, editEditorData]);

  const handleSaveEditor = () => {
    if (!article) {
      localStorage.removeItem("document");
      const dataToCreate = {
        ...editorData,
        version: editorData.version ?? null,
        time: editorData.time ?? null,
        blocks: convertToJSON(editorData.blocks),
      };
      createArticle(dataToCreate).then((res) => {
        router.push(`/article/${res.success?.id}`);
      });
    } else {
      localStorage.removeItem("edit-document");
      router.push("/feed");
    }
  };

  return (
    <div>
      {!article ? (
        <>
          <Button onClick={handleSaveEditor}>Save</Button>
          <Suspense fallback={`Loading...`}>
            <ArticleEditor
              data={editorData}
              onChange={setEditorData}
              editorblock="editorjs-container"
            />
          </Suspense>
        </>
      ) : (
        <>
          <Button onClick={handleSaveEditor}>Update</Button>

          <div id="edit-editor" />
        </>
      )}
    </div>
  );
};

export default ArticleForm;
