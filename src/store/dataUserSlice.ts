import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DataUserSlice {
    token: string
}

const initialState: DataUserSlice = {
    token: ""
}

const dataUserSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setDataUser: (state: DataUserSlice, action: PayloadAction<any>) => {
            state.token = action.payload;
        },
    },
});

export const { setDataUser } = dataUserSlice.actions;
export default dataUserSlice.reducer;