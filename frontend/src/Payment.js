import React from 'react'
import "./Payment.css"
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import Subtotal from "./Subtotal";
import { getUserAddress, getUserPaymentCard } from "./DBFunctions";


function Payment() {
    const [ { cart, promoCodes , user }, dispatch] = useStateValue();
    let subtotal = 0.0;
    
    let savings = 0.0;
    let shippingCost = 5.99;
    let taxRate = 0.0825;
    let order_total = 0.0;

    let user_address1 = null;
    let user_address2 = null
    let user_city = null
    let user_state = null
    let user_zip = null

    let user_card_num = null
    let user_card_date = null
    let user_card_CVV = null

    subtotal = getMoneyFloatFromString(Subtotal({flagVal:1}));
    savings = getMoneyFloatFromString(Subtotal({flagVal:2}));

    let tax_sum = (subtotal - savings) * taxRate;
    tax_sum = tax_sum.toFixed(2) // fixes to 2 decmial points (sometimes itll have a long decimal for some reason)

    order_total = Number.parseFloat(parseFloat(subtotal) - parseFloat(savings) + parseFloat(tax_sum) + parseFloat(shippingCost)).toFixed(2); 

    // grabs user address from DB if user is logged in
    console.log(user_address1)
    if( user && user?.email !== 'Guest') {
        [user_address1, user_address2, user_city, user_state, user_zip] = getUserAddress(user?.ID);
    }
    console.log(user_address1)

    // grabs user card data from DB if user is logged in
    if( user && user?.email !== 'Guest') {
        [user_card_num, user_card_date, user_card_CVV] = getUserPaymentCard(user?.id);
    }

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
                    <p>Items: ${subtotal}</p>
                    <p>Promo Savings: ${savings}</p>
                    <p>Shipping & Handling: ${shippingCost}</p>
                    <p>Tax: ${tax_sum}</p>
                    <p>Order Total: ${order_total}</p>

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

function getMoneyFloatFromString(money)
{
    const regex_dollar = /(^\d+)\.(\d{2})/;
    const dollar_parsed = money.match(regex_dollar);

    let moneyDollars = dollar_parsed[1];
    let moneyCents = dollar_parsed[2];

    moneyDollars = parseInt(moneyDollars)
    moneyCents = parseInt(moneyCents) * 0.01;

    let moneyFloat = moneyDollars + moneyCents;
    return parseFloat(moneyFloat);
}

export default Payment