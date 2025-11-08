import { configureStore } from "@reduxjs/toolkit";
import orderTypeSlice from "./orderTypeSlice";
import resturentApi from "./ResturantApi";

const store = configureStore({
    reducer: {
        orderType: orderTypeSlice,
        resturentApi : resturentApi
    }
});
export default store;