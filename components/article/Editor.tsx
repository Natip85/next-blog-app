"use client";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { EditorTools } from "@/lib/editorTools";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type ArticleEditorProps = {
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
  onSave: (data: OutputData) => void;
};
const Editor = ({
  placeholder,
  readOnly,
  minHeight,
  onSave,
}: ArticleEditorProps) => {
  const router = useRouter();
  const editorJS = useRef<EditorJS | null>(null);
  const [currentArticle, setCurrentArticle] = useState<OutputData>(() => {
    const storedData = localStorage.getItem("document");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return {
        time: 1635603431943,
        blocks: [],
      };
    }
  });
  useEffect(() => {
    if (editorJS.current === null) {
      editorJS.current = new EditorJS({
        placeholder,
        readOnly,
        minHeight,
        holder: "editorjs",
        data: currentArticle,
        tools: EditorTools,
        async onChange(api: API, event: CustomEvent) {
          await editorJS.current?.save().then((res) => {
            setCurrentArticle(res);
            let logDataString = JSON.stringify(res);
            localStorage.setItem("document", logDataString);
          });
        },
      });
    }
  }, []);

  const handleSave = async () => {
    try {
      const savedData = await editorJS.current?.save();
      if (savedData) {
        onSave(savedData);
        editorJS.current?.blocks.clear();
        localStorage.removeItem("document");
        router.push(`/feed`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <div className="p-10">
      <div className="flex items-center justify-end">
        <Button onClick={handleSave}>Save</Button>
      </div>
      <div id="editorjs" className="bg-white container mx-auto max-w-4xl" />
    </div>
  );
};

export default Editor;
