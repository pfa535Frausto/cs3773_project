import React from 'react'
import "./Subtotal.css"
import { useStateValue } from "./StateProvider";
import { useNavigate } from 'react-router-dom'



function Subtotal(flagVal) {
    const navigate = useNavigate ();
    const [{ cart, promoCodes }, dispatch] = useStateValue();
    let flag = Object.values(flagVal)[0]
    let withCode = 0;
    let onlyCost = 1;
    let onlySavings = 2;

    let subtotal = 0
    let savings = 0;


    let cartIsEmpty = false;
    let btn_state = "enabled__button";
    if( cart.length === 0 ){
        cartIsEmpty = true;
        btn_state = "disabled__button";
    }
    

    // calculate subtotal
    for( let i = 0; i < cart.length; i++) 
    {
        subtotal += cart[i].price;
    }
    if( flag !== onlyCost ){
    for( let i = 0; i < promoCodes.length; i++) 
        {
            savings += promoCodes[i].savings;
        }
    }
    if( flag === onlySavings )
    {
        return formatMoney(savings);
    }
    subtotal -= savings;
    subtotal = subtotal.toFixed(2) // fixes to 2 decmial points (sometimes itll have a long decimal for some reason)
    subtotal = formatMoney(subtotal)
    if( flag === onlyCost )
    {
        return subtotal;
    }
    if( flag === withCode ){
        return (
            <div className="subtotal">
                <>
                    <p>
                        Subtotal ({cart?.length} items): <strong>${subtotal}</strong>
                    </p>
                </>
                <button className={btn_state} disabled={cartIsEmpty} onClick={e => navigate('/payment')}>Proceed to Checkout</button>
            </div>
        )
    }
};

function formatMoney(money) {
    // makes subtotal look nice with a fixed decimal point if no cents involved
    let subtotalStr = money.toString();
    let subtotal_dollars = subtotalStr;
    let subtotal_cents = "00";

    // grabs cents from subtotal and puts it in a string
    if( subtotalStr.length > 3 && (subtotalStr[subtotalStr.length - 3] === '.' ))
    {
        subtotal_cents = subtotalStr.slice(-2);
        subtotal_dollars = subtotalStr.slice(0,-3);
    }
    // grabs cents from subtotal if only has tenths and no hundreths and puts it in a string 
    else if( subtotalStr.length > 2 && (subtotalStr[subtotalStr.length - 2] === '.' ))
    {
        subtotal_cents = subtotalStr.slice(-1) + '0';
        subtotal_dollars = subtotalStr.slice(0,-2);
    }
    // adds commas to the number in appropriate places
    let dollar_comma = 3;
    while( dollar_comma < subtotal_dollars.length )
    {
        subtotal_dollars = subtotal_dollars.slice(0,subtotal_dollars.length - dollar_comma) + ',' + subtotal_dollars.slice(subtotal_dollars.length - dollar_comma);
        dollar_comma += 4;
    }
    let formattedMoney = subtotal_dollars + '.' + subtotal_cents;

    return formattedMoney
}

export default Subtotal;

