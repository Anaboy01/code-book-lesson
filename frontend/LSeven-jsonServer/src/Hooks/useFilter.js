import { useState, useCallback, useMemo } from "react";

export const useFilter = () => {
    const [productList, setProductList] = useState([]);
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [bestSellerOnly, setBestSellerOnly] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [ratings, setRatings] = useState(null);

    const filteredProducts = useMemo(() => {
        let filtered = [...productList];

        // Filter by bestseller
        if (bestSellerOnly) {
            filtered = filtered.filter(p => p.best_seller === true);
        }

        // Filter by stock
        if (onlyInStock) {
            filtered = filtered.filter(p => p.in_stock === true);
        }

        // Filter by ratings
        if (ratings) {
            const ratingValue = parseInt(ratings.replace("STARSABOVE", ""));
            filtered = filtered.filter(p => p.rating >= ratingValue);
        }

        // Sort
        if (sortBy === "lowtohigh") {
            filtered.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === "hightolow") {
            filtered.sort((a, b) => Number(b.price) - Number(a.price));
        }

        return filtered;
    }, [productList, onlyInStock, bestSellerOnly, sortBy, ratings]);

    const clearFilters = useCallback(() => {
        setOnlyInStock(false);
        setBestSellerOnly(false);
        setSortBy(null);
        setRatings(null);
    }, []);

    return {
        productList,
        setProductList,
        filteredProducts,
        onlyInStock,
        setOnlyInStock,
        bestSellerOnly,
        setBestSellerOnly,
        sortBy,
        setSortBy,
        ratings,
        setRatings,
        clearFilters
    };
};
