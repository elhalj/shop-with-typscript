export interface ArticleProps {
  _id: string;
  name: string;
  price: number;
  details: string;
  category: string;
  stock: number;
  image: string;
  vendor: { _id: string; name: string };
}
