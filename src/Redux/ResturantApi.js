import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchRestaurant = createAsyncThunk("api/resturentApi", async (orderType) => {

    const latitude = 19.032626310834413 // Number(location?.latitude);19.032626310834413  //23.8623  //
    const longitude = 72.84266162663698
    const res = await fetch(`${BASE_URL}/v1/api/restaurantList`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            latitude,
            longitude,
            cityId: 0,
            length: -1,
            searchKey: "",
            startCount: 0,
            orderType: orderType
        })
    });
    const getres = await res.json();
    return getres;
})

const restaurantApi = createSlice({
    name: "resturentApi",
    initialState: {
        response: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurant.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchRestaurant.fulfilled, (state, action) => {
                state.loading = false
                state.response = action.payload
            })
            .addCase(fetchRestaurant.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false
            })
    }
});
export default restaurantApi.reducer