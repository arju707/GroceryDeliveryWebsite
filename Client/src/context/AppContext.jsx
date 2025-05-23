import React from "react";
import {createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;



export const AppContext= createContext();


export const AppContextProvider=({children})=>{


    const currency= import.meta.env.VITE_CURRENCY;

    const navigate=useNavigate();

    const [user,setUser]=useState(null)

  
  const [isSeller,setIsSeller]=useState(false)

    const [showUserLogin,setShowUserLogin]=useState(false)

    const [products,setProducts]=useState([])


    const [cartItems,setCartItems]=useState({})

    const [searchQuery,setSearchQuery]=useState({})

    //feth user sts ,cartitms

    const fetchUser = async()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {

            setUser(null)
            
        }
    }




    //feth seller sts

    const fetchSeller = async()=>{

        try {
            const {data} = await axios.get('/api/seller/is-auth');
            if(data.success){
                setIsSeller(true);

            }
            else{
                                setIsSeller(false);

            }
        } catch (error) {
            
            setIsSeller(false);
        }
    }

    //all products
    const fetchProducts =async()=>{
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {

            toast.error(error.message)
            
        }
    }


    //all t o cart

    const addToCart = (itemId)=>{

      
            let cartData = structuredClone(cartItems);

            if(cartData[itemId]){
                 cartData[itemId] +=1;

            }
            else{
                cartData[itemId] =1;            
            }
            setCartItems(cartData);
            toast.success("Added to Cart")
    }

    //update cart

    const updateCartItem = (itemId, quantity)=>{

        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")

    }

    //remove from cart 

    const removeFromCart = (itemId)=>{
        let cartData= structuredClone(cartItems);
        if(cartData[itemId])
            cartData[itemId] -=1;
            if(cartData[itemId] ===0)
            {
                delete cartData[itemId];
            }
            toast.success("Removed From Cart")
            setCartItems(cartData)
    }


    //cartCount
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount+=cartItems[item]
        }
        return  totalCount;
    }
    
    //total cart amount

   const getCartAmount = () => {
    let total = 0
    for (const key in cartItems) {
        const product = products.find((item) => item._id === key)
        if (product) {
            const quantity = cartItems[key]
            const price = Number(product.offerPrice) || 0
            total += price * quantity
        }
    }
    return total
}



    useEffect(()=>{
        fetchUser()
        fetchSeller() 
            fetchProducts()
            
    },[])

    const value={ navigate, user, setUser, setIsSeller, isSeller ,showUserLogin,setShowUserLogin,  products, currency, addToCart ,updateCartItem ,removeFromCart , cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts }

   return <AppContext.Provider value={value}>
    {children}
   </AppContext.Provider>
}
export const useAppContext =()=>{ 
    return useContext(AppContext)
}