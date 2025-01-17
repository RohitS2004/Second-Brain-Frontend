import { createSlice } from "@reduxjs/toolkit";

interface Auth {
    isAuthenticated: boolean,
    username: string,
    email: string,
    profilePicture: string,
}

const initialState: Auth = {
    isAuthenticated: false,
    username: "",
    email: "",
    profilePicture: "",
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
        setUserInfo: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.profilePicture = action.payload.profilePicture;
        },
    }
})

export const { login, logout, setUserInfo } = AuthSlice.actions;
export default AuthSlice.reducer;