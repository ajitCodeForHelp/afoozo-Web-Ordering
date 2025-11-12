import { configureStore } from "@reduxjs/toolkit";
import orderTypeSlice from "./orderTypeSlice";
import resturentApi from "./ResturantApi";
import vegNonvegSlice from "./VegNonvegSlice";
import CustomerSlice from "./customerSlice";

const store = configureStore({
    reducer: {
        orderType: orderTypeSlice,
        resturentApi: resturentApi,
        vegNonveg: vegNonvegSlice,
        customerData: CustomerSlice,
    }
});

export default store;