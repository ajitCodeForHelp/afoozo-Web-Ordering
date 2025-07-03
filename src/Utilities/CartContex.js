export const cartReducer = (state, action) => {
    let updatedItems;

    switch (action.type) {
        case 'INITIALIZE_CART':
            return action.payload || { items: [], address: null };

        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.itemId === action.payload.uuid);
            console.log(action.payload, "action payload");
            if (existingItem) {
                updatedItems = state.items.map(item =>
                    item.itemId === action.payload.uuid
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            break;

        case 'REMOVE_ITEM':
            console.log(action.payload, "action payload");
            updatedItems = state.items.filter(item => item.itemId !== action.payload);
            break;

        case 'UPDATE_QUANTITY':
            updatedItems = state.items
                .map(item =>
                    item.itemId === action.payload.uuid
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
                .filter(item => item.quantity > 0);
            break;

        case 'UPDATE_SPECIAL_ITEM_INSTRUCTION':
            updatedItems = state.items.map(item =>
                item.itemId === action.payload.uuid
                    ? { ...item, specialInstruction: action.payload.specialInstruction }
                    : item
            );
            break;

        case 'SET_ADDRESS':
            const updatedWithAddress = { ...state, address: action.payload };
            localStorage.setItem('cart', JSON.stringify(updatedWithAddress));
            return updatedWithAddress;

        default:
            return state;
    }

    const updatedCart = {
        ...state,
        items: updatedItems,
    };

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
};
