import { Link } from "react-router-dom";
import { useTitle } from "../../Hooks/useTitle";
import { useCart } from "../../context";
import { MdDelete } from "react-icons/md";

const CartPage = () => {
  useTitle("Shopping Cart - CodeBook");
  
  const { cartList, total, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    alert("Checkout feature coming in Lesson 7!");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold dark:text-white mb-8">Shopping Cart</h1>

      {cartList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Your cart is empty
          </p>
          <Link 
            to="/products"
            className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
                {cartList.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <img 
                      src={item.poster} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold dark:text-white">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        ${item.price}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 transition"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between dark:text-gray-300">
                <span>Items:</span>
                <span>{cartList.length}</span>
              </div>
              <div className="flex justify-between dark:text-gray-300">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between dark:text-gray-300">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold dark:text-white">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition mb-2"
            >
              Checkout
            </button>
            <button 
              onClick={clearCart}
              className="w-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
