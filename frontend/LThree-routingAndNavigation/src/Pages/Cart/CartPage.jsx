import { Link } from "react-router-dom";

const CartPage = () => {
  // In this lesson, the cart is empty
  // Later lessons will add cart context and state management
  const cartItems = [];

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold dark:text-white mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
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
            {/* Cart items will be displayed here in future lessons */}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between dark:text-gray-300">
                <span>Subtotal:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between dark:text-gray-300">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold dark:text-white">
                <span>Total:</span>
                <span>$0.00</span>
              </div>
            </div>
            <button 
              disabled
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
