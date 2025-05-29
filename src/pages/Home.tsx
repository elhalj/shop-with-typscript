import { useEffect, useState } from 'react'
import { UseCardStore } from '../store/CardStore/CardStore'
import type { ArticleProps } from '../types/CardTypes'
import Card from '../components/Card'

const Home = () => {
  const [items, setItems] = useState<ArticleProps[] | null>(null)
  const {getArticles, articles, isLoading, error} = UseCardStore()
  useEffect(() => {
    const getCard = async () => {
      await getArticles()
      setItems(articles)
    }
    getCard()
  },[getArticles, articles])

  if (isLoading) {
    <div className='h-screen items-center justify-center'>Chargement...</div>
  }

  if (error) {
    <div>Une erreur est survenu</div>
  }
  return (
    <div className="container mx-auto my-6 grid grid-cols-1items-center justify-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {items?.map(item => (<Card key={item._id} cardItems={item}/>))}
    </div>
  )
}

export default Home
