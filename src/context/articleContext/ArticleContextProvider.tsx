import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { ArticleContext, type ArticleProps } from "./ArticleContext";
import axios, { AxiosError } from "axios";


interface ArticleContextProps {
    children: ReactNode
};

const ArticleContextProvider = ({ children }: ArticleContextProps) => {
    const [cardItems, setCardItems] = useState<ArticleProps[]>(() => {
        const storedCardItems = localStorage.getItem('cardItems');
        return storedCardItems ? JSON.parse(storedCardItems) : [];
    });
    const [isArticleLoading, setIsArticleLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getArticle = useCallback(async (data: ArticleProps) => {
        setIsArticleLoading(true);
        try {
            const response = await axios.get("http://localhost:5001/api/article/get", { params: data })
            setCardItems(response.data.cardItems)
            localStorage.setItem("cardItems", JSON.stringify(response.data.cardItems));
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            setError(err.response?.data?.message || err.message || "Unknown error");
        } finally {
            setIsArticleLoading(false)
        }
    }, [])

    const value = useMemo(() => ({
        isArticleLoading,
        error,
        getArticle,
        cardItems
    }), [isArticleLoading, error, getArticle, cardItems])

    return (
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    )

    useEffect(() => {
        // Récupération des articles
        if (cardItems.length > 0) {
            cardItems.forEach(item => getArticle(item));
        }
    }, [cardItems, getArticle]);

    const articleValue = useMemo(() => ({
        cardItems,
        isArticleLoading,
        error,
        getArticle
    }), [cardItems, isArticleLoading, error, getArticle]);

    return (
        <ArticleContext.Provider value={articleValue}>
            {children}
        </ArticleContext.Provider>
    )
};

export default ArticleContextProvider