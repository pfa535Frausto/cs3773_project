const UserMatch = (email, pw) => {
    let match = false;
    // do DB query for username + pw
    // http://localhost:8080/api/v1/account/users/{email}/password/{password}
    // if returned a match
    match = true;
    return match;
}

const UserExists = (email) => {
    let match = false;
    // do DB query for username + pw
    // http://localhost:8080/api/v1/account/users/{email}/password/{password}
    // if returned a match
    // match = true;
    return match;
}

const AddUserToDB = (email, pw) => {
    // add email + pw to DB
    // http://localhost:8080/api/v1/account/users/{email}/password/{password}
}

const getUserID = (email) => {
    let ID = 0;
    // get unique ID from DB
    // http://localhost:8080/api/v1/account/users/{email}/password/{password}
    
    return ID;

}
const getPromoCodeValue = (id) => {
    let value = "invalid";
    // query DB for promo code
    // if returned a match
    // value == query.value
    

    // These values were hardcoded to verify the function works, delete when done
    if( id === "abc" ){
        return 45;
    }
    if( id === "bcd" ){
        return 12.01;
    }


    return value;
}

const getUserAddress = (userID) => {
    let userAddress = "";
    let Address1 = null;
    let Address2 = null
    let city = null
    let state = null
    let zip = null

    // query DB for user address using unique ID
    // http://localhost:8080/api/v1/account/users/{email}/password/{password}

    // These values were hardcoded to verify the function works, delete when done
    //userAddress = "Address1_test,Address2_test,city_test,state_test,12345"

    // returns null values if user has not saved an address
    if(userAddress === "")
    {
        return [Address1,Address2,city,state,zip]
    }
    
    let addy_parsed = userAddress.split(",");
    Address1 = addy_parsed[0];
    Address2 = addy_parsed[1];
    city = addy_parsed[2];
    state = addy_parsed[3];
    zip = addy_parsed[4];

    return [Address1,Address2,city,state,zip];
}

const getUserPaymentCard = (userID) => {
    let userPaymentCard = "";
    let card_num = null
    let exp = null
    let CVV = null
    // query DB for user address using unique ID
    // userPaymentCard = http://localhost:8080/api/v1/account/users/{email}/password/{password}

    // These values were hardcoded to verify the function works, delete when done
    //userPaymentCard = "12345678901234561234123"


    // returns null values if user has not saved a card
    if(userPaymentCard === "")
    {
        return [card_num, exp, CVV];
    }

    // parse card data
    card_num = [...userPaymentCard];
    card_num.splice(16);
    card_num = card_num.join('');

    exp = [...userPaymentCard];
    exp.splice(0,16);
    exp.splice(4,3);
    exp = exp.join('');

    CVV = [...userPaymentCard];
    CVV.splice(0,20);
    CVV = CVV.join('');

    // return tuple
    return [card_num, exp, CVV];
}
export {UserMatch, UserExists, AddUserToDB, getUserID, getPromoCodeValue, getUserAddress, getUserPaymentCard};
