import React from 'react';
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider"

function CheckoutProduct({ id, title, image, price, rating, remove_btn_enabled }) {
    const [ {cart}, dispatch ] = useStateValue();
    let remove_btn_name = "";
    
    if( remove_btn_enabled === "true" ){
        remove_btn_name = "button__removeFromCart";
    }
    if( remove_btn_enabled === "false" ){
        remove_btn_name = "button__disabled";
    }

    const removeFromCart = () => {
        // remove the item from the data layer
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: id
        });
    };

  return (
    <div className="checkoutProduct">
        <img className="checkoutProduct__image" src={image} />

        <div className="checkoutProduct__info" >

            <p className="checkoutProduct__title" >{title}
            </p>
            <p className="checkoutProduct__price" >
                <small>$</small>
                <strong>{price}</strong>
            </p>

            <button className={remove_btn_name} onClick={removeFromCart}>Remove from Cart</button>

        </div>
    </div>

  )
}


/* The following existed above the removeFromCart code
<div className="checkoutProduct__rating" >
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>⭐</p>
                ))}
</div>
*/
export default CheckoutProduct