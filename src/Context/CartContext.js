
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

    const [cart, setCart] = useState([]);

    const totalQty = () => {

        
        
      
        return cart.reduce((counter,product) =>  counter +  product.quantity, 0 ) 
    }

    const totalPurchase = () =>{

        return cart.reduce ((counter, product)=> counter+ product.price * product.quantity, 0)
    }

    const addItem = (item) => {

        console.log(item)
        
        setCart([...cart, item]);
    }

    const removeItem = (itemId) => {
        
        setCart(cart.filter(post => post.id !== itemId));
    }

    const clearCart = () => {
        
        setCart([]);
    }

    const isInCart = (itemid) => {
        
        return cart.some(post => post.id === itemid)
    }


    console.log('Carrito',cart);

    return(
        <CartContext.Provider value = {{
            cart,
            addItem,
            removeItem,
            isInCart,
            clearCart,
            totalPurchase,
            totalQty,

        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;