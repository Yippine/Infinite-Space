"use client";

import { useDocumentStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, FileText, Trash2, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const { documents, addDocument, removeDocument } = useDocumentStore();
  const router = useRouter();
  const params = useParams();
  const activeDocumentId = params.documentId as string;

  const handleCreate = () => {
    const newDocId = addDocument();
    router.push(`/documents/${newDocId}`);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeDocument(id);
    if (activeDocumentId === id) {
      router.push("/");
    }
  };

  return (
    <div className="h-full w-60 flex flex-col bg-secondary/30 border-r group">
      <div className="p-4 flex items-center gap-2 border-b">
        <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-xs">
          N
        </div>
        <span className="font-semibold text-sm">Notion Clone</span>
      </div>

      <div className="p-2">
        <Button
          onClick={handleCreate}
          variant="ghost"
          className="w-full justify-start text-muted-foreground h-8 px-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Page
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {documents.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No pages yet.
            </p>
          )}
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={cn(
                "group/item flex items-center gap-x-2 py-1 px-2 text-sm font-medium rounded-sm hover:bg-primary/5 transition-colors w-full",
                activeDocumentId === doc.id && "bg-primary/5 text-primary"
              )}
            >
              <Link
                href={`/documents/${doc.id}`}
                className="flex items-center gap-x-2 flex-1 truncate"
              >
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{doc.title || "Untitled"}</span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger
                  onClick={(e) => e.stopPropagation()}
                  asChild
                >
                  <div
                    role="button"
                    className="h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 p-1"
                  >
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-60"
                  align="start"
                  side="right"
                  forceMount
                >
                  <DropdownMenuItem onClick={(e) => handleDelete(e, doc.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
