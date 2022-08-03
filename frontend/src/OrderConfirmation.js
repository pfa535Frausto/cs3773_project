import React from 'react';
import CheckoutProduct from "./CheckoutProduct";



import './OrderConfirmation.css';
import { useStateValue } from './StateProvider';


function OrderConfirmation(){
    const [ { cart , user }, dispatch] = useStateValue();
    let total_charge = 0;

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                        Your order has been placed for {cart?.length} items!
                </h1>
                </div>
                
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>
                        {cart.map(item => (
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            remove_btn_enabled="false"
                            />
                        ))}
                        </h3>
                    </div>
                    <div className="payment_summary">
                        <p>Total Charge: ${total_charge}</p>
                    </div>
    
            </div>
        </div>
      )
    }

export default OrderConfirmation;