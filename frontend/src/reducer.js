export const initialState = {
    cart: [],
    user: null,
    promoCodes: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.item],
            };

        case "REMOVE_FROM_CART":
            // finds first item that matches the ID in the cart
            const index_cart = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            );

            // duplicate current cart
            let newCart = [...state.cart];

            // if item found
            if( index_cart >= 0 )
            {
                // remove item found at index i
                newCart.splice(index_cart, 1);
            }
            // item not found in cart
            else{
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in cart!`
                )
            }        
            // return duplicate cart created
            return {
                ...state,
                cart: newCart
            };

        case "SET_USER":
            return {
                ...state,
                user: action.user
            };

            
        case "ADD_PROMO":
            return {
                ...state,
                promoCodes: [...state.promoCodes, action.code],
            };

        case "REMOVE_PROMO":
            // finds first item that matches the ID in the promo list
            const index_promoCodes = state.promoCodes.findIndex(
                (promo_code) => promo_code.id === action.id
            );

            // duplicate current cart
            let newPromoList = [...state.promoCodes];

            // if item found
            if( index_promoCodes >= 0 )
            {
                // remove item found at index i
                newPromoList.splice(index_promoCodes, 1);
            }
            // item not found in cart
            else{
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in cart!`
                )
            }        
            // return duplicate cart created
            return {
                ...state,
                promoCodes: newPromoList
            };

        default:
            return state;
    }
};

export default reducer;