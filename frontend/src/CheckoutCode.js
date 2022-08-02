import React from 'react';
import "./CheckoutCode.css";
import { useStateValue } from "./StateProvider"

function CheckoutCode({ id, savings }) {
    const [ {promoCodes}, dispatch ] = useStateValue();    
    const removePromo = () => {

        dispatch({
            type: 'REMOVE_PROMO',
                id:id
        });
    };

  return (
    <div className="checkoutProduct">
        <div className="checkoutProduct__info" >
            
            <p className="checkoutProduct__title" >{id}
            </p>
            <p className="checkoutProduct__price" >
                <small>Saving: $</small>
                <strong>{savings}</strong>
            </p>

            <button className="button__removePromoCode" onClick={removePromo}>Remove promo code</button>

        </div>
    </div>

  )
}

export default CheckoutCode