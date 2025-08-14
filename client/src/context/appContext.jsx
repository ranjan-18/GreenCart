// ✅ Imports
import React, { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

// ✅ Create Context
export const AppContext = createContext();

// ✅ Provider Component
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY; // ✅ fixed env import
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]); // ✅ initialized as array
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const fetchProduct = async () => {
    setProducts(dummyProducts);
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success("Removed from Cart");
      setCartItems(cartData);
    }
  };
   
  // get cart item
  const getCartCount=()=>{
    let totalCount=0;
    for(const item in cartItems)
    {
      totalCount+=cartItems[item];
    }
    return totalCount;
  }
  
  // GET CARTTOTAL AMOUNT
  const getCartAmount=()=>{
    let totalAmount=0;
    for( const items in cartItems)
    {
      let itemInfo=products.find((product)=>product._id===items)
      if(cartItems[items]>0)
      {
        totalAmount+=itemInfo.offerPrice*cartItems[items]
      }
    }
    return Math.floor(totalAmount*100)/100;
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems, // ✅ added
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ✅ Custom Hook to use Context
export const useAppContext = () => {
  return useContext(AppContext);
};
