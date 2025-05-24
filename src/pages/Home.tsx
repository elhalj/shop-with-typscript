import { useContext, useEffect } from "react"
import Card from "../components/Card"
import { ArticleContext, type ArticleProps } from "../context/articleContext/ArticleContext"

const Home = () => {
    const context = useContext(ArticleContext)
    
    useEffect(() => {
        if (context && context.cardItems.length > 0) {
            context.cardItems.forEach((item: ArticleProps) => context.getArticle(item));
        }
    }, [context])

    if (!context) {
        return <div>Loading...</div>
    }

    const { cardItems, getArticle, isArticleLoading, error } = context;
    
    if (error) {
        return <div>Error: {error}</div>
    }
    
    return (
        <div>
            {cardItems && <Card cardItems={cardItems} />}
        </div>
    )
}

export default Home
