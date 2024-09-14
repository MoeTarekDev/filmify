import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  open: boolean;
};
const initialState: initialStateType = {
  open: false,
};
export const menuReducer = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.open = !state.open;
    },
  },
});

export default menuReducer.reducer;
export let menuActions = menuReducer.actions;
