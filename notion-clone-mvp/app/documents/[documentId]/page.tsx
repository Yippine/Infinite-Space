"use client";

import { useDocumentStore } from "@/lib/store";
import Editor from "@/components/editor/editor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DocumentPage() {
  const params = useParams();
  const documentId = params.documentId as string;
  const { getDocument, updateDocument } = useDocumentStore();

  // We need to handle hydration mismatch because of localStorage
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const document = getDocument(documentId);

  if (!document) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Document not found.
      </div>
    );
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDocument(documentId, { title: e.target.value });
  };

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="pt-12 px-12 pb-4">
          <input
            value={document.title}
            onChange={onTitleChange}
            className="text-5xl font-bold break-words outline-none text-[#3F4447] dark:text-[#CFCFCF] bg-transparent w-full placeholder:text-muted-foreground"
            placeholder="Untitled"
          />
        </div>
        <Editor documentId={document.id} initialContent={document.content} />
      </div>
    </div>
  );
}
