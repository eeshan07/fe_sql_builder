import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.user = { name: "demo_user" };
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
