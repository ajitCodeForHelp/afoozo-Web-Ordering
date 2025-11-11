import { configureStore } from "@reduxjs/toolkit";
import orderTypeSlice from "./orderTypeSlice";
import resturentApi from "./ResturantApi";
import vegNonvegSlice from "./VegNonvegSlice";

const store = configureStore({
    reducer: {
        orderType: orderTypeSlice,
        resturentApi: resturentApi,
        vegNonveg: vegNonvegSlice
    }
});
export default store;