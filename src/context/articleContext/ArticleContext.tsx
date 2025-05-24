import { createContext } from "react";

export interface ArticleProps {
  name: string;
  price: number;
  details: string;
  category: string;
  stock: number;
  image: string;
  vendor: { _id: string; name: string };
}

export type ArticleContextType = {
  isArticleLoading: boolean;
  error: string | null;
  getArticle: (data: ArticleProps) => Promise<void>;
  cardItems: ArticleProps[];
};

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined
);
