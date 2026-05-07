import { useState, useCallback } from "react";

export const useCart = () => {
    const [cartList, setCartList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const addToCart = useCallback((product) => {
        setLoading(true);
        try {
            // In this lesson, we're just updating local state
            // Later lessons will integrate with API and Context
            setCartList(prev => [...prev, product]);
            setTotal(prev => prev + Number(product.price || 0));
        } finally {
            setLoading(false);
        }
    }, []);

    const removeFromCart = useCallback((productId) => {
        setLoading(true);
        try {
            const product = cartList.find(p => p.id === productId);
            if (product) {
                setCartList(prev => prev.filter(p => p.id !== productId));
                setTotal(prev => prev - Number(product.price || 0));
            }
        } finally {
            setLoading(false);
        }
    }, [cartList]);

    const clearCart = useCallback(() => {
        setLoading(true);
        try {
            setCartList([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        cartList,
        total,
        loading,
        addToCart,
        removeFromCart,
        clearCart
    };
};
