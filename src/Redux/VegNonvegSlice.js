import { createSlice } from "@reduxjs/toolkit";

const vegNonvegSlice = createSlice({
    name: "vegNonveg",
    initialState: {
        vegNonveg: ''
    },
    reducers: {
        setVegNonveg: (state, action) => {
            state.vegNonveg = action.payload
        }
    }
});
export const { setVegNonveg } = vegNonvegSlice.actions;
export default vegNonvegSlice.reducer
