import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss"

const CheckoutItem = ({cartItem}) => {
    const {addItemToCart,removeItemFromCart,removeWholeItemFromCart} = useContext(CartContext);
    
    const {imageUrl, name, price, quantity} = cartItem;
    return (
    <div className="checkout-item-container">
        <div className="image-container"><img src={imageUrl} alt={`${name}`}/></div>
        <span className="name">{name}</span>
        <span className="price">{price}</span>

        <span className="quantity">
            <div className="arrow" onClick={()=>removeItemFromCart(cartItem)}>&#10094;</div>
            <div className="value">{quantity}</div>
            <div className="arrow" onClick={()=>addItemToCart(cartItem)}>&#10095;</div>
        </span>

        <div className="remove-button" onClick={()=>removeWholeItemFromCart(cartItem)}>&#10005;</div>
    </div>)
}

export default CheckoutItem;