"use client";

import { Button } from "@/components/ui/button";
import { useDocumentStore } from "@/lib/store";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { addDocument } = useDocumentStore();
  const router = useRouter();

  const handleCreate = () => {
    const newDocId = addDocument();
    router.push(`/documents/${newDocId}`);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-medium">
        Welcome to Notion Clone
      </h2>
      <Button onClick={handleCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
}
