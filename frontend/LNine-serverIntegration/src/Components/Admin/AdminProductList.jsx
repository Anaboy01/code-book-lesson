import React, { useEffect, useState } from 'react'
import { getProductList } from '../../Services'
import adminService from '../../Services/adminService'
import { MdDelete, MdEdit } from 'react-icons/md'
import { toast } from 'react-toastify'

const AdminProductList = ({ onEdit }) => {
     const [products, setProducts] = useState([])
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState("")
     const [searchTerm, setSearchTerm] = useState("")
      
     const fetchProducts = async () => {
        try{
            setLoading(true);
            const data = await getProductList(searchTerm);
            setProducts(data)
        } catch(err) {
            setError(err.message) 
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchProducts()
    }, [searchTerm])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await adminService.deleteEbook(id);
                setProducts(products.filter(p => p.id !== id));
                toast.success("Product deleted successfully");
            } catch (err) {
                toast.error(err.message);
            }
        }
    };

    if (loading && products.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                />
            </div>

            {error && (
                <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                                Price
                            </th>
                            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                                Rating
                            </th>
                            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                                Stock
                            </th>
                            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                                Best Seller
                            </th>
                            <th className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                <td className="px-4 py-3 dark:text-gray-300">{product.name}</td>
                                <td className="px-4 py-3 dark:text-gray-300">${product.price}</td>
                                <td className="px-4 py-3 dark:text-gray-300">{product.rating}/5</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-semibold ${
                                            product.in_stock
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {product.in_stock ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-semibold ${
                                            product.best_seller
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                        }`}
                                    >
                                        {product.best_seller ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 flex justify-center gap-2">
                                    <button
                                        onClick={() => onEdit && onEdit(product)}
                                        className="text-blue-600 hover:text-blue-700 transition"
                                        aria-label={`Edit ${product.name}`}
                                    >
                                        <MdEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 hover:text-red-700 transition"
                                        aria-label={`Delete ${product.name}`}
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
                Total Products: {products.length}
            </div>

            {products.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No products found.
                </div>
            )}
        </div>
    )
}

export default AdminProductList
