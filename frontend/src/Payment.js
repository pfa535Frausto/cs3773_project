import React, {useState} from 'react';
import "./Payment.css"
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import Subtotal from "./Subtotal";
import { getUserAddress, getUserPaymentCard } from "./DBFunctions";


function Payment() {
    const navigate = useNavigate();

    const [ { cart, promoCodes , user }, dispatch] = useStateValue();
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zip, setZip] = useState(null);
    const [addressSuccess, setAddressSuccess] = useState("False")


    const [cardNum, setCardNum] = useState(null);
    const [exp, setExp] = useState(null);
    const [CVV, setCVV] = useState(null);
    const [cardSuccess, setCardSuccess] = useState("False")

    const [getAddyBool, getAddy] = useState("True")
    const [getCardBool, getCard] = useState("True")

    let subtotal = 0.0;
    
    let savings = 0.0;
    let shippingCost = 5.99;
    let taxRate = 0.0825;
    let order_total = 0.0;

    let addyArr = null;
    let cardArr = null;

    let disablePlaceOrderBtn = true;
    let disableSubmitAddyBtn = false;
    let disableSubmitPaymentBtn = false;

    let addyFieldStatus = false;
    let paymentFieldStatus = false;

    let paymentBtnStatus = "button__placeOrder__disabled";
    let submitAddyBtnStatus = "button__formOptions__enabled"
    let submitPaymentBtnStatus = "button__formOptions__enabled"

    if( user && user?.email !== 'Guest' && getAddyBool === "True") {
        addyArr = getUserAddress(user?.ID);
        if(addyArr[0] !== null){
            console.log("grabbing data");
            setAddress1(addyArr[0]);
            setAddress2(addyArr[1]);
            setCity(addyArr[2]);
            setState(addyArr[3]);
            setZip(addyArr[4]);
            setAddressSuccess("True");
            getAddy("False");
        }
    }

    // grabs user card data from DB if user is logged in
    if( user && user?.email !== 'Guest' && getCardBool === "True") {
        cardArr = getUserPaymentCard(user?.id);
        if(cardArr[0] !== null){
            setCardNum(cardArr[0]);
            setExp(cardArr[1]);
            setCVV(cardArr[2]);
            setCardSuccess("True");
            getCard("False");
        }
    }
    

    if (addressSuccess === "True"){
        submitAddyBtnStatus = "button__formOptions__disabled";
        disableSubmitAddyBtn = true;
        addyFieldStatus = true;

    }

    if (cardSuccess === "True"){
        submitPaymentBtnStatus = "button__formOptions__disabled";
        disableSubmitPaymentBtn = true;
        paymentFieldStatus = true;


    }

    if (addressSuccess === "True" && cardSuccess === "True"){
        console.log("can hit submit")
        disablePlaceOrderBtn = false;
        
        paymentBtnStatus = "button__placeOrder__enabled";

    }

    subtotal = getMoneyFloatFromString(Subtotal({flagVal:1}));
    savings = getMoneyFloatFromString(Subtotal({flagVal:2}));

    let tax_sum = (subtotal - savings) * taxRate;
    tax_sum = tax_sum.toFixed(2) // fixes to 2 decmial points (sometimes itll have a long decimal for some reason)

    order_total = Number.parseFloat(parseFloat(subtotal) - parseFloat(savings) + parseFloat(tax_sum) + parseFloat(shippingCost)).toFixed(2); 
    // grabs user address from DB if user is logged in

    const submitOrder = () => {


        console.log("submit order");
        navigate('/confirmation');

    }

    const verifyAddress = () => {
        //verify address details entered match format
        if( address1 === "" || address1 === null || address2 === "" || address2 === null ||  city === "" || city === null|| state === "" || state === null || zip === "" || zip === null)
        {
            return;
        }

        // upon success
        setAddressSuccess("True");
        navigate('/payment');

        console.log("submit address");
    }

    const verifyPayment = () => {
        //verify card details entered match format
        if( cardNum === "" || cardNum === null|| exp === "" || exp === null || CVV === "" || CVV === null )
        {
            return;
        }


        // upon success
        setCardSuccess("True");
        navigate('/payment');



        console.log("submit card");
    }
    
    const unblockAddress = () =>{ 
        disableSubmitAddyBtn = false;
        submitAddyBtnStatus = "button__formOptions__enabled";
        setAddressSuccess("False")

        navigate('/payment');

    }

    const unblockPayment = () =>{ 
        disableSubmitPaymentBtn = false;
        submitPaymentBtnStatus = "button__formOptions__enabled";
        setCardSuccess("False")

        navigate('/payment');

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
                        <input onChange={e => setAddress1(e.target.value)} class="form-control rounded" placeholder="Address Line 1" aria-label="Search" aria-describedby="search-addon" disabled={addyFieldStatus} value={address1}/>
                    </div>
                    <div class="input-group rounded">
                        <input onChange={e => setAddress2(e.target.value)} class="form-control rounded" placeholder="Address Line 2 (Optional)" aria-label="Search" aria-describedby="search-addon" disabled={addyFieldStatus} value={address2}/>
                    </div>
                    <div class="input-group rounded">
                        <input onChange={e => setCity(e.target.value)}  class="form-control rounded" placeholder="City" aria-label="Search" aria-describedby="search-addon" disabled={addyFieldStatus} value={city}/>
                    </div>
                    <div class="input-group rounded">
                        <input onChange={e => setState(e.target.value)} class="form-control rounded" placeholder="State" aria-label="Search" aria-describedby="search-addon" disabled={addyFieldStatus} value={state}/>
                    </div>
                    <div class="input-group rounded">
                        <input onChange={e => setZip(e.target.value)} class="form-control rounded" placeholder="Zip Code" aria-label="Search" aria-describedby="search-addon" disabled={addyFieldStatus} value={zip}/>
                    </div>
                    <button className={submitAddyBtnStatus} disabled={disableSubmitAddyBtn} onClick={verifyAddress}> Submit Address </button>
                    <button className="button__formOptions__enabled" onClick={unblockAddress}> Edit </button>
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
                        <input onChange={e => setCardNum(e.target.value)}  class="form-control rounded" placeholder="Credit Card Number" aria-label="Search" aria-describedby="search-addon" disabled={paymentFieldStatus} value={cardNum}/> 
                    </div>
                    <div class="input-group rounded">
                        <input onChange={e => setExp(e.target.value)} class="form-control rounded" placeholder="MM/DD" aria-label="Search" aria-describedby="search-addon" disabled={paymentFieldStatus} value={exp}/>
                    </div>
                    <div class="input-group rounded">
                        <input onChange={e => setCVV(e.target.value)} class="form-control rounded" placeholder="CVV" aria-label="Search" aria-describedby="search-addon" disabled={paymentFieldStatus} value={CVV}/>
                    </div>

                    <button className={submitPaymentBtnStatus} disabled={disableSubmitPaymentBtn} onClick={verifyPayment}> Submit Payment </button>
                    <button className="button__formOptions__enabled" onClick={unblockPayment}> Edit </button>
                </div>
            </div>

            <div className="payment__section">
                <div className="payment__title">
                    <h3></h3>
                </div>
                <div className="payment_summary">
                        <button className={paymentBtnStatus} disabled={disablePlaceOrderBtn} onClick={submitOrder}> Place Order </button>
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