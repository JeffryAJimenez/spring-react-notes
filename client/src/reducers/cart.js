import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../actions/types";

const initialState = {
    items: [],
    totalAmount: 0
}

export default function(state = initialState, action){

    const {type, payload} = action;

    switch(type){

        case CART_ADD_ITEM:
            
            const totalAmount = state.totalAmount + payload.price * payload.amount;
            
            const existingCartItemIndex = state.items.findIndex(item => item.id === payload.id);

            const existingCartItem = state.items[existingCartItemIndex];


            let updatedItem;
            let updatedItems;

            if(existingCartItem){
                updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + payload.amount
                }

                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }else {

                updatedItem = {...payload};
                updatedItems = [...state.items, updatedItem];
            }


            return {
                items: updatedItems,
                totalAmount: totalAmount
            };
            

        case CART_REMOVE_ITEM:
            const existingCartItemIndex2 = state.items.findIndex(item => item.id === payload);
            const existingCartItem2 = state.items[existingCartItemIndex2];
            
            const updatedTotalAmount2 = state.totalAmount - existingCartItem2.price;

            let updatedItems2;

            if(existingCartItem2.amount === 1) {
                
                updatedItems2 = state.items.filter(item => item.id !== payload);

            }else {
                const updatedItem = {...existingCartItem2, amount: existingCartItem2.amount - 1};
                updatedItems2 = [...state.items];
                updatedItems2[existingCartItemIndex2] = updatedItem;
            }

            return {
                items: updatedItems2,
                totalAmount: updatedTotalAmount2
            };

        default:
            return state;
    }
}