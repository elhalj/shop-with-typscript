const CardImage = ({ image }: { image: string }) => {
  return (
    <div className="w-full h-full">
       <img src={image} alt={image} className="w-full h-full" />
    </div>
  )
}

export default CardImage
