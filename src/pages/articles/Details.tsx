import { useParams } from "react-router-dom"
import { UseCardStore } from "../../store/CardStore/CardStore"
import { useEffect, useState } from "react"
import type { ArticleProps } from "../../types/CardTypes"
import CardImage from "../../components/CardImage"

const Details = () => {
    const { name } = useParams<{ name: string }>();
    const [article, setArticle] = useState<ArticleProps | null>(null)
    const { articles, getArticles, } = UseCardStore()

    useEffect(() => {
        const fetchArticle = async () => {
            await getArticles()
            const foundArticle = articles?.find(item => item.name === name)
            setArticle(foundArticle || null)
        }
        fetchArticle()
    }, [articles, getArticles, name])

    // if (isLoading) {
    //     return <div className="container mx-auto p-4">Chargement...</div>
    // }

    // if (error) {
    //     return <div className="container mx-auto p-4 text-red-500">{error}</div>
    // }

    if (!article) {
        return <div className="container mx-auto p-4">Article non trouvé</div>
    }

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <CardImage image={article.image} />
                </div>
                <div className="md:w-1/2 space-y-4">
                    <h1 className="text-3xl font-bold">{article.name}</h1>
                    <p className="text-2xl font-semibold text-primary">{article.price} €</p>
                    <p className="text-gray-600">{article.details}</p>
                    <div className="space-y-2">
                        <p><span className="font-semibold">Catégorie:</span> {article.category}</p>
                        <p><span className="font-semibold">Stock:</span> {article.stock} unités</p>
                        <p><span className="font-semibold">Vendeur:</span> {article.vendor.name}</p>
                    </div>
                    <button className="btn btn-primary">Ajouter au panier</button>
                </div>
            </div>
        </div>
    )
}

export default Details
