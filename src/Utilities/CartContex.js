// export const cartReducer = (state, action) => {
//     let updatedItems;

//     switch (action.type) {
//         case 'INITIALIZE_CART':
//             return action.payload || { items: [], address: null };

//         case 'ADD_ITEM':
//             const existingItem = state.items.find(item => item.itemId === action.payload.uuid);
//             console.log(action.payload, "action payload");
//             if (existingItem) {
//                 updatedItems = state.items.map(item =>
//                     item.itemId === action.payload.uuid
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//             } else {
//                 updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
//             }

//             break;

//         case 'REMOVE_ITEM':
//             console.log(action.payload, "action payload");
//             updatedItems = state.items.filter(item => item.itemId !== action.payload);
//             break;

//         case 'UPDATE_QUANTITY':
//             updatedItems = state.items
//                 .map(item =>
//                     item.itemId === action.payload.uuid
//                         ? { ...item, quantity: action.payload.quantity }
//                         : item
//                 )
//                 .filter(item => item.quantity > 0);
//             break;

//         case 'UPDATE_SPECIAL_ITEM_INSTRUCTION':
//             updatedItems = state.items.map(item =>
//                 item.itemId === action.payload.uuid
//                     ? { ...item, specialInstruction: action.payload.specialInstruction }
//                     : item
//             );
//             break;

//         case 'SET_ADDRESS':
//             const updatedWithAddress = { ...state, address: action.payload };
//             localStorage.setItem('cart', JSON.stringify(updatedWithAddress));
//             return updatedWithAddress;

//         default:
//             return state;
//     }

//     const updatedCart = {
//         ...state,
//         items: updatedItems,
//     };

//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     return updatedCart;
// };


export const cartReducer = (state, action) => {
    let updatedItems;

    switch (action.type) {
        case 'INITIALIZE_CART':
            return action.payload || { items: [], address: null, restaurant: null };

        case 'ADD_ITEM':
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.itemId === newItem.uuid);

            // Check if restaurant is already in cart and different
            if (
                state.items.length > 0 &&
                state.restaurant &&
                state.restaurant.restaurantId !== newItem.restaurant.restaurantId
            ) {
                // You can handle this case outside reducer via UI confirmation
                return state; // Don't modify state
            }

            if (existingItem) {
                updatedItems = state.items.map(item =>
                    item.itemId === newItem.uuid
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedItems = [...state.items, { ...newItem, quantity: 1 }];
            }

            const cartWithItem = {
                ...state,
                items: updatedItems,
                restaurant: newItem.restaurant, // Add restaurant details
            };

            localStorage.setItem('cart', JSON.stringify(cartWithItem));
            return cartWithItem;

        case 'REMOVE_ITEM':
            updatedItems = state.items.filter(item => item.itemId !== action.payload);
            const remainingItems = updatedItems.length > 0 ? updatedItems : [];
            const restaurantAfterRemove = remainingItems.length > 0 ? state.restaurant : null;

            const cartAfterRemove = {
                ...state,
                items: remainingItems,
                restaurant: restaurantAfterRemove,
            };

            localStorage.setItem('cart', JSON.stringify(cartAfterRemove));
            return cartAfterRemove;

        case 'UPDATE_QUANTITY':
            updatedItems = state.items
                .map(item =>
                    item.itemId === action.payload.uuid
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
                .filter(item => item.quantity > 0);

            const cartAfterUpdateQty = {
                ...state,
                items: updatedItems,
                restaurant: updatedItems.length > 0 ? state.restaurant : null,
            };

            localStorage.setItem('cart', JSON.stringify(cartAfterUpdateQty));
            return cartAfterUpdateQty;

        case 'UPDATE_SPECIAL_ITEM_INSTRUCTION':
            updatedItems = state.items.map(item =>
                item.itemId === action.payload.uuid
                    ? { ...item, specialInstruction: action.payload.specialInstruction }
                    : item
            );

            const cartWithInstructions = {
                ...state,
                items: updatedItems,
            };

            localStorage.setItem('cart', JSON.stringify(cartWithInstructions));
            return cartWithInstructions;

        case 'ADD_CUSTOMIZABLE_ITEM':
            const { item, customization } = action.payload;

            // Create a unique signature for the item + its customizations
            const customizationSignature = JSON.stringify(customization || []);

            const existingItemWithCustomization = state.items.find(
                cartItem =>
                    cartItem.itemId === item.uuid &&
                    JSON.stringify(cartItem.customization || []) === customizationSignature
            );

            if (
                state.items.length > 0 &&
                state.restaurant &&
                state.restaurant.restaurantId !== item.restaurant.restaurantId
            ) {
                return state; // prevent cross-restaurant addition
            }

            if (existingItemWithCustomization) {
                updatedItems = state.items.map(cartItem =>
                    cartItem.itemId === item.uuid &&
                        JSON.stringify(cartItem.customization || []) === customizationSignature
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedItems = [
                    ...state.items,
                    {
                        ...item,
                        // itemId: item.uuid,
                        quantity: 1,
                        customization: customization || [],
                    },
                ];
            }

            const cartWithCustomItem = {
                ...state,
                items: updatedItems,
                restaurant: item.restaurant,
            };

            localStorage.setItem('cart', JSON.stringify(cartWithCustomItem));
            return cartWithCustomItem;

        case 'SET_ADDRESS':
            const updatedWithAddress = { ...state, address: action.payload };
            localStorage.setItem('cart', JSON.stringify(updatedWithAddress));
            return updatedWithAddress;

        case 'CLEAR_CART':
            localStorage.removeItem('cart');
            return { items: [], address: null, restaurant: null };

        default:
            return state;
    }
};
