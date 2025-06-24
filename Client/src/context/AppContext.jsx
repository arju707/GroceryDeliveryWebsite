import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [isSeller, setIsSeller] = useState(false);

  const [showUserLogin, setShowUserLogin] = useState(false);

  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState({});

  const [searchQuery, setSearchQuery] = useState({});

  //feth user sts ,cartitms

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/is-auth",
        {},
        { withCredentials: true }
      );
      console.log(data, "from fetfh user");

      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      setUser(null);
    }
  };

  //feth seller sts

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get(
        "/api/seller/is-auth",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  //all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //all t o cart

  const addToCart = (itemId) => {
    console.log(itemId, "item id from the add to cart");

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      console.log();

      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  //update cart
  const updateCartItem = (itemId, newQuantity) => {
  setCartItems((prevItems) => {
    if (newQuantity <= 0) {
      return prevItems.filter((item) => item.productId !== itemId);
    }
    return prevItems.map((item) =>
      item.productId === itemId ? { ...item, quantity: newQuantity } : item
    );
  });
};

  //remove from cart

  const removeFromCart = (itemId) => {
  setCartItems((prevItems) => prevItems.filter((item) => item.productId !== itemId));
  toast.success("Removed From Cart");
};
  //cartCount
  const getCartCount = () => {
    return cartItems.length;
  };

  //total cart amount

  const getCartAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        const quantity = cartItems[key];
        const price = Number(product.offerPrice) || 0;
        total += price * quantity;
      }
    }
    return total;
  };

  useEffect(() => {
    // fetchUser()
    fetchSeller();
    fetchProducts();
  }, []);

  //database cart items

  useEffect(() => {
    const updateCart = async () => {
      try {
        console.log(cartItems, "cart items2");
        console.log(
          typeof cartItems,
          Array.isArray(cartItems),
          cartItems,
          "cart items2"
        );
        const cartArray = Object.entries(cartItems).map(
          ([productId, quantity]) => ({
            productId,
            quantity,
          })
        );
        const { data } = await axios.post("/api/cart/update", {
          userId: user.id,
          cartItems: cartArray,
        });
        if (!data.success) {
          // toast.error(data.message)
        }
      } catch (error) {
        // toast.error(error.message)
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems]);

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    fetchUser,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};
