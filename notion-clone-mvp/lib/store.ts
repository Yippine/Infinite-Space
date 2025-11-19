import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Document = {
  id: string;
  title: string;
  icon?: string;
  content?: string; // JSON string of BlockNote content
  createdAt: number;
  updatedAt: number;
};

interface DocumentStore {
  documents: Document[];
  addDocument: () => string; // Returns new document ID
  removeDocument: (id: string) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  getDocument: (id: string) => Document | undefined;
}

export const useDocumentStore = create<DocumentStore>()(
  persist(
    (set, get) => ({
      documents: [],
      addDocument: () => {
        const newDoc: Document = {
          id: crypto.randomUUID(),
          title: 'Untitled',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          documents: [newDoc, ...state.documents],
        }));
        return newDoc.id;
      },
      removeDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id),
        }));
      },
      updateDocument: (id, updates) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, ...updates, updatedAt: Date.now() } : doc
          ),
        }));
      },
      getDocument: (id) => {
        return get().documents.find((doc) => doc.id === id);
      },
    }),
    {
      name: 'notion-clone-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
