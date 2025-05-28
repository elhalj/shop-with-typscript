
import type { ArticleProps } from "../types/CardTypes"
import CardImage from "./CardImage"




const Card = ({cardItems}: {cardItems: ArticleProps}) => {
  return (
    <div className="flex flex-col justify-center items-center w-[300px]  gap-2 mb-4 rounded-2xl shadow-lg transition hover:scale-105 duration-75">
      <div className="w-full h-full transition hover:scale-105">
        <CardImage image={cardItems.image} />
      </div>
      <div className="flex gap-2 p-4">
        <h2>{cardItems.name}</h2>
        <p>{cardItems.price}</p>
      </div>
      <div>
        <p>{cardItems.details}</p>
      </div>
      <div className="flex flex-col">
        <h3>{cardItems.category}</h3>
        <p>{cardItems.stock}</p>
        <p>{cardItems.vendor.name}</p>
      </div>
    </div>
  )
}

export default Card
