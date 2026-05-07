import { Link } from "react-router-dom";
import { Rating } from "./Rating";
import { useCart } from "../../context";

export const ProductCard = ({ product }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { id, name, price, rating, poster, in_stock } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-shadow dark:bg-gray-800">
      <Link to={`/products/${id}`} className="block relative">
        <img 
          src={poster} 
          alt={name}
          className="w-full h-48 object-cover hover:opacity-80 transition"
        />
        {!in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Out of Stock</span>
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${id}`} className="hover:text-rose-600 transition">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
            {name}
          </h3>
        </Link>
        
        <Rating rating={rating} />
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-rose-600 dark:text-rose-500">
            ${price}
          </span>
          <button 
            onClick={handleAddToCart}
            disabled={!in_stock}
            className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
