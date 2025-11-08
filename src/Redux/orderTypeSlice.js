import { createSlice } from "@reduxjs/toolkit";

const order = sessionStorage.getItem("orderType");

const orderTypeSlice = createSlice({
    name: "orderTypeSlice",
    initialState: {
        orderType: order || 'Cafe'
    },
    reducers: {
        setOrderTypeee: (state, action) => {
            state.orderType = action.payload
        },
    },
});

export const { setOrderTypeee } = orderTypeSlice.actions;
export default orderTypeSlice.reducer; 