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

const getPromoCodeValue = (id) => {
    let value = "invalid";
    // query DB for promo code
    // if returned a match
    // value == query.value
    // 
    return value;
}


export {UserMatch, UserExists, AddUserToDB};
export {getPromoCodeValue};