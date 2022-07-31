import React from 'react'
import "./Payment.css"
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";




function Payment() {
    const [ { cart, user }, dispatch] = useStateValue();

    let user_address1 = "";
    let user_address2 = "";
    let user_city = "";
    let user_state = "";
    let user_zip = "";

    let user_card_num = "";
    let user_card_date = "";
    let user_card_CVV = "";



  return (
    <div className="payment">
        <div className="payment__container">
            <h1>
                Checkout (
                    <Link to="/checkout">{cart?.length} items</Link>
                )
            </h1>

            <div className="payment__section">
                <div className="payment__title">
                    <h3>Total Cost</h3>
                </div>
                <div className="payment_summary">
                    <p>Items: $</p>
                    <p>Promo Savings: $</p>
                    <p>Shipping & Handling: $</p>
                    <p>Tax: $</p>
                    <p>Order Total: $</p>

                </div>
            </div>

            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Address Line 1" aria-label="Search" aria-describedby="search-addon" value={user_address1}/>
                    </div>
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Address Line 2 (Optional)" aria-label="Search" aria-describedby="search-addon" value={user_address2}/>
                    </div>
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="City" aria-label="Search" aria-describedby="search-addon" value={user_city}/>
                    </div>
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="State" aria-label="Search" aria-describedby="search-addon" value={user_state}/>
                    </div>
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Zip Code" aria-label="Search" aria-describedby="search-addon" value={user_zip}/>
                    </div>
                </div>
            </div>
            
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review Items</h3>
                </div>
                <div className="payment__items">
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
                </div>
            </div>


            <div className="payment__section">
                <div className="payment__title">
                    <h3>payment method</h3>
                </div>
                <div className='payment__details'>
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Credit Card Number" aria-label="Search" aria-describedby="search-addon" value={user_card_num}/> 
                    </div>
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="MM/DD" aria-label="Search" aria-describedby="search-addon" value={user_card_date}/>
                    </div>
                    <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="CVV" aria-label="Search" aria-describedby="search-addon" value={user_card_CVV}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Payment