import { create } from "zustand";
import type { ArticleProps } from "../../types/CardTypes";

// type CardStore = {
//     article: ArticleProps[] | null;
//     isArticle: boolean;
//     error: string | null;
//     getArticle: (data: ArticleProps) => Promise<void>;
// }

// import { create } from 'zustand';
// import { ArticleProps } from '../../types/CardTypes';

type CardStore = {
  articles: ArticleProps[] | null;
  isLoading: boolean;
  error: string | null;
  getArticles: () => Promise<void>;
};

export const UseCardStore = create<CardStore>((set) => ({
  articles: null,
  isLoading: false,
  error: null,

  getArticles: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("http://localhost:5001/api/article/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (!response.data) {
        throw new Error("Aucun article trouvé");
      }
      set({ articles: response.data });
    } catch (error) {
      const typeError = error as Error;
      set({ error: typeError.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
