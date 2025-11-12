import { createSlice } from "@reduxjs/toolkit";
import { getSecureItem } from "../Utilities/Storage";
import { useCart } from "../Utilities/CartProvider";

const customerData = getSecureItem("customerData");
const cart = JSON.parse(localStorage.getItem("cart"));
const CustomerSlice = createSlice({
    name: "customeData",
    initialState: {
        customerData: customerData || {},
        address: cart?.address || null,
    },
    reducers: {
        setCustomerData: (state, action) => {
            state.customerData = action.payload
        },
        setDeliveryAddress: (state, action) => {
            state.address = action.payload
        }
    }
});

export const { setCustomerData, setDeliveryAddress } = CustomerSlice.actions;
export default CustomerSlice.reducer;