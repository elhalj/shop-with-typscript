import type { ArticleProps } from "../context/articleContext/ArticleContext"
import CardImage from "./CardImage"



// import { ArticleProps } from '../context/articleContext/ArticleContext'

const Card = ({cardItems}: {cardItems: ArticleProps[]}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {cardItems.map((item, index) => (
        <div key={index} className="flex flex-col w-[150px] h-[300px] rounded-lg shadow-lg transition hover:scale-105 duration-75">
          <div className="w-[150px] h-[150px] transition hover:scale-75">
            <CardImage image={item.image} />
          </div>
          <div className="flex gap-2">
            <h2>{item.name}</h2>
            <p>{item.price}</p>
          </div>
          <div>
            <p>{item.details}</p>
          </div>
          <div className="flex flex-col">
              <h3>{item.category}</h3>
              <p>{item.stock}</p>
              <p>{item.vendor.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
