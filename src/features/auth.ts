import { createSlice } from "@reduxjs/toolkit";

interface Auth {

}

const initialState: Auth = {

}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    }
})

export const {  } = AuthSlice.actions;
export default AuthSlice.reducer;