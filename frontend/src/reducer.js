export const initialState = {
    cart: [],
    user: null
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
            const index = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            );

            // duplicate current cart
            let newCart = [...state.cart];

            // if item found
            if( index >= 0 )
            {
                // remove item found at index i
                newCart.splice(index, 1);
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

        default:
            return state;
    }
};

export default reducer;