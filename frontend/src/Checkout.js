import React, {useState} from 'react'
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutCode from "./CheckoutCode";
import { useStateValue } from "./StateProvider";
import { getPromoCodeValue } from "./DBFunctions";




function Checkout() {
  const [ { cart, user, promoCodes }, dispatch] = useStateValue();
  const [promo_code_input, setPromoCode] = useState('');

  let message = "Save time on future orders by creating an account and adding your address and credit card information on the \"Account Settings\" page"
  if ( user && user?.email !== 'Guest' ){
    message = "Save time on future orders by adding your address and credit card information on the \"Account Settings\" page"
  }

  const addPromo = () => {
    // verify promo exists
    let value = getPromoCodeValue(promo_code_input);
    // will return "invalid" if promo code does not exist
    if( value === "invalid" ){
      return;
    }
    // continue if promo code is valid
    dispatch({
        type: 'ADD_PROMO',
        code: {
          id: promo_code_input,
          savings:value,
      },
    });
};


  return (
    <div className="checkout">
        <div className="checkout__left">
            <h2 className="checkout__ad">{message}</h2>
            
            <div>
                <h2 className="checkout__title">Your shopping cart</h2>
                {cart.map(item => (
                  <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    remove_btn_enabled="true"
                  />
                ))}
                <h2 className="checkout__title">Promo Codes</h2>
                <input type="search" class="form-control rounded" placeholder="Enter Promo Code" aria-label="Search" aria-describedby="search-addon" onChange={e => setPromoCode(e.target.value)}/>
                <button className="button__applyPromoCode" onClick={addPromo}> Apply Promo Code </button>
                {promoCodes.map(code => (
                  <CheckoutCode
                    id={code.id}
                    savings={code.savings}
                    />
                ))}
            </div>
        </div>

        <div className="checkout__right">
            <Subtotal
              flagVal={0} />
        </div>
    </div>
    
  )
}

export default Checkout