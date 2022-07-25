import React from 'react'
import "./Payment.css"
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";




function Payment() {
    const [ { cart, user }, dispatch] = useStateValue();


  return (
    <div className="payment">
        <div className="payment__container">
            <h1>
                Checkout (
                    <Link to="checkout">{cart?.length} items</Link>
                )
            </h1>

            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>123 reow st</p>
                    <p>Reow Antonio, TX</p>
                </div>
            </div>
            
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review Items and delivery</h3>
                </div>
                <div className="payment__items">
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

            <div className="payment__section">
                <div className="payment__title">
                    <h3>payment method</h3>
                </div>
                <div className='payment__details'>
                    reow
                </div>
            </div>

        </div>
    </div>
  )
}

export default Payment