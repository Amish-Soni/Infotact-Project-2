import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!auth.user) {
      setCart(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/cart/");
      setCart(data.cart);
    } catch (error) {
      console.error("Failed to fetch cart", error);
      toast.error("Could not fetch cart.");
    } finally {
      setLoading(false);
    }
  }, [auth.user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (menuId, quantity = 1) => {
    try {
      const { data } = await axiosInstance.post("/cart/add", {
        menuId,
        quantity,
      });
      setCart(data.cart);
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item.");
    }
  };

  const updateCartItem = async (menuId, quantity) => {
    try {
      const { data } = await axiosInstance.put("/cart/update", {
        menuId,
        quantity,
      });
      setCart(data.cart);
    } catch (error) {
      toast.error("Failed to update cart.");
    }
  };

  const removeCartItem = async (menuId) => {
    try {
      const { data } = await axiosInstance.delete(`/cart/remove/${menuId}`);
      setCart(data.cart);
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error("Failed to remove item.");
    }
  };

  const clearCart = () => {
    // This is called after a successful order
    setCart(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
