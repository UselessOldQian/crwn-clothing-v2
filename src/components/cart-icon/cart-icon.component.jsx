import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg"
import {useContext} from 'react'

import './cart-icon.styles.scss'
import { CartContext } from "../../contexts/cart.context"

const CartIcon = () =>{

    const {isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext);

    const toggle = () =>{
        setIsCartOpen(!isCartOpen);
    }

    // console.log(cartItems.length && cartItems.reduce((total, cartItem)=> total + cartItem.quantity),0);
    return (
        <div className="cart-icon-container" onClick={toggle}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{cartItems.length && cartItems.reduce((total, cartItem)=> total + cartItem.quantity,0)}</span>
        </div>
    )
}

export default CartIcon