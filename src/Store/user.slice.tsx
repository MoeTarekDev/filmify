import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  userEmail: string;
  userPassword: string;
  userName?: string;
  userToken: string;
  userImage?: string;
};
const initialState: initialStateType = {
  userEmail: "",
  userPassword: "",
  userName: "",
  userToken: "",

  userImage: "",
};
let userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserPassword: (state, action) => {
      state.userPassword = action.payload;
      console.log(action.payload);
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("uid");
      localStorage.removeItem("userName");
      state.userToken = "";
      state.userName = "";
      state.userImage = "";
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
  },
});

export default userReducer.reducer;
export let userActions = userReducer.actions;
