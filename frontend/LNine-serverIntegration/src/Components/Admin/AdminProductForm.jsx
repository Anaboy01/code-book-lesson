import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTitle } from '../../Hooks/useTitle';
import adminService from '../../Services/adminService';

const AdminProductForm = ({ product = null, onSuccess }) => {
    useTitle(product ? "Edit Product - Admin - CodeBook" : "Add Product - Admin - CodeBook");

    const [formData, setFormData] = useState({
        name: '',
        overview: '',
        long_description: '',
        price: '',
        rating: 5,
        poster: '',
        size: '',
        inStock: true,
        bestSeller: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                overview: product.overview || '',
                long_description: product.long_description || product.longDescription || '',
                price: product.price || '',
                rating: product.rating || 5,
                poster: product.poster || '',
                size: product.size || '',
                inStock: product.in_stock !== undefined ? product.in_stock : (product.inStock !== undefined ? product.inStock : true),
                bestSeller: product.best_seller !== undefined ? product.best_seller : (product.bestSeller !== undefined ? product.bestSeller : false)
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formData.name || !formData.price || !formData.poster || !formData.overview || !formData.long_description || !formData.size) {
                toast.error("Please fill in all required fields");
                setLoading(false);
                return;
            }

            const dataToSubmit = {
                ...formData,
                price: parseFloat(formData.price),
                rating: parseFloat(formData.rating),
                size: parseFloat(formData.size)
            };

            if (product) {
                await adminService.updateEbook(product.id, dataToSubmit);
                toast.success('Product updated successfully');
            } else {
                await adminService.createEbook(dataToSubmit);
                toast.success('Product created successfully');
            }

            onSuccess();
        } catch (err) {
            toast.error(err.message || "Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold dark:text-white mb-6">
                {product ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Price ($) *
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Rating (1-5)
                    </label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        Size (MB) *
                    </label>
                    <input
                        type="number"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        min="0"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Image URL *
                </label>
                <input
                    type="url"
                    name="poster"
                    value={formData.poster}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                    required
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Short Overview *
                </label>
                <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                    required
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Detailed Description *
                </label>
                <textarea
                    name="long_description"
                    value={formData.long_description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                    required
                />
            </div>

            <div className="mt-4 flex gap-4">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <input
                        type="checkbox"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleChange}
                        className="w-4 h-4"
                    />
                    In Stock
                </label>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <input
                        type="checkbox"
                        name="bestSeller"
                        checked={formData.bestSeller}
                        onChange={handleChange}
                        className="w-4 h-4"
                    />
                    Best Seller
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-700 transition disabled:opacity-50"
            >
                {loading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
            </button>
        </form>
    );
};

export default AdminProductForm;