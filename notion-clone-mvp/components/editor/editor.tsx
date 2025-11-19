"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useDocumentStore } from "@/lib/store";
import { useEffect, useState } from "react";

interface EditorProps {
  documentId: string;
  initialContent?: string;
}

export default function Editor({ documentId, initialContent }: EditorProps) {
  const { updateDocument } = useDocumentStore();

  // Create editor instance
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  // Auto-save on change
  const handleChange = () => {
    const content = JSON.stringify(editor.document);
    updateDocument(documentId, { content });
  };

  // We need to render BlockNoteView only on client and handle theme if needed
  // For MVP, we'll just render it.

  return (
    <div className="pl-12 pr-12 pt-4 pb-20">
      <BlockNoteView
        editor={editor}
        onChange={handleChange}
        theme="light" // Force light for MVP simplicity, or make dynamic
      />
    </div>
  );
}
