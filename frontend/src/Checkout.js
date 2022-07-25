import React from 'react'
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";


function Checkout() {
  const [ { cart }, dispatch] = useStateValue();


  return (
    <div className="checkout">
        <div className="checkout__left">
            <h2 className="checkout__ad">Save time on future orders by clicking "Save to my account" to save your address and payment method!  </h2>
            
            <div>
                <h2 className="checkout__title">Your shopping cart</h2>
                {cart.map(item => (
                  <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  />
                ))}
            </div>
        </div>

        <div className="checkout__right">
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout