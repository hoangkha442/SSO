import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoadingSlice {
    loading: boolean
}

const initialState: LoadingSlice = {
    loading: false
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setGlobalLoading: (state: LoadingSlice, action: PayloadAction<any>) => {
            state.loading = action.payload;
        },
    },
});

export const { setGlobalLoading } = loadingSlice.actions;
export default loadingSlice.reducer;