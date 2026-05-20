import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface RoleSlice {
    role: string
}

const initialState: RoleSlice = {
    role: ""
}

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setGlobalRole: (state: RoleSlice, action: PayloadAction<any>) => {
            state.role = action.payload;
        },
    },
});

export const { setGlobalRole } = roleSlice.actions;
export default roleSlice.reducer;