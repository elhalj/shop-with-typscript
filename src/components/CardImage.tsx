const CardImage = ({ image }: { image: string }) => {
  return (
    <div className="w-full h-full">
       <img src={image} alt={image} className="w-full h-full rounded-2xl" />
    </div>
  )
}

export default CardImage
