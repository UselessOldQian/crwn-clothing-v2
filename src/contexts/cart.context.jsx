import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () =>{},
    cartItems:[],
    addItemToCart: () =>{},
    removeItemFromCart: ()=>{},
    removeWholeItemFromCart: ()=>{},
    total:0
});

const addCartItem = (cartItems, productToAdd)=>{
    const existingCartItem = cartItems.find((cartItem)=>{
        return cartItem.id === productToAdd.id;
    });
    if(existingCartItem){
        return cartItems.map((cartItem)=>{
            return cartItem.id === productToAdd.id ?
            {...cartItem,quantity:cartItem.quantity+1}
            :cartItem;
        })
    }

    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem = (cartItems, productToRemove) =>{
    const existingCartItem = cartItems.find((cartItem)=>{
        return cartItem.id === productToRemove.id;
    });

    if(existingCartItem.quantity <= 1){
        return cartItems.filter((cartItem)=>cartItem.id!==existingCartItem.id)
    }

    return cartItems.map((cartItem) => {
        if(cartItem.id === productToRemove.id){
            return {...cartItem, quantity: cartItem.quantity-1}
        }
        return cartItem
    })
}

const removeWholeItem = (cartItems, productToRemove) =>{
    return cartItems.filter((cartItem)=>cartItem.id!==productToRemove.id)
}

const getTotal = (cartItems) => {
    return cartItems.reduce((count,cartItem)=>count + cartItem.price * cartItem.quantity
    ,0);
}

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(()=>setTotal(getTotal(cartItems)),
    [cartItems]);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const removeItemFromCart = (productToRemove)=>{
        setCartItems(removeCartItem(cartItems,productToRemove));
    }
    const removeWholeItemFromCart = (productToRemove)=>{
        setCartItems(removeWholeItem(cartItems,productToRemove))
    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart,removeItemFromCart,removeWholeItemFromCart,total};
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);
}