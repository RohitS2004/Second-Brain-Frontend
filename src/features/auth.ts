import { createSlice } from "@reduxjs/toolkit";

interface Auth {
    isAuthenticated: boolean,
    username: string
}

const initialState: Auth = {
    isAuthenticated: false,
    username: "",
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        logout: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        }
    }
})

export const { login, logout, setUsername } = AuthSlice.actions;
export default AuthSlice.reducer;