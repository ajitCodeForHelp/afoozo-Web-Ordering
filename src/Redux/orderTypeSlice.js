import { createSlice } from "@reduxjs/toolkit";

const order = sessionStorage.getItem("orderType");
const orderInfo = sessionStorage.getItem("orderData");

const orderTypeSlice = createSlice({
    name: "orderTypeSlice",
    initialState: {
        orderType: order || 'Cafe',
        orderData: JSON.parse(orderInfo) || {}
    },
    reducers: {
        setOrderTypeee: (state, action) => {
            state.orderType = action.payload
        },
        setOrderData: (state, action) => {
            state.orderData = action.payload
        }
    },
});

export const { setOrderTypeee, setOrderData } = orderTypeSlice.actions;
export default orderTypeSlice.reducer; 