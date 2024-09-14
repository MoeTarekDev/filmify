import { createSlice } from "@reduxjs/toolkit";

export const scrollUp = () => {
  window.scrollTo(0, 0);
};
const getSystemThemePreference = () => {
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return darkModeQuery.matches; // Returns true if dark mode is preferred
};
type initialStateType = {
  isDark: boolean;
  page: number;
  scrollPosition: number;
  showGoTop: string;
  authPage: string;
};
const initialState: initialStateType = {
  page: JSON.parse(localStorage.getItem("page") ?? "1"),
  scrollPosition: 0,
  showGoTop: "opacity-0",
  authPage: "signIn",

  isDark:
    // @ts-ignore
    JSON.parse(localStorage.getItem("isDark")) ?? getSystemThemePreference(),
};
let featuresReducer = createSlice({
  name: "feature",
  initialState,
  reducers: {
    increasePage: (state) => {
      state.page = state.page + 1;
      localStorage.setItem("page", JSON.stringify(state.page));
    },
    decreasePage: (state) => {
      if (state.page > 1) {
        state.page = state.page - 1;
        localStorage.setItem("page", JSON.stringify(state.page));
      }
    },
    firstPage: (state) => {
      state.page = 1;
      localStorage.setItem("page", JSON.stringify(1));
    },
    setScrollPosition: (state) => {
      const x = window.scrollY;
      state.scrollPosition = x;
    },
    setShowGoTop: (state) => {
      if (state.scrollPosition > 1000) {
        state.showGoTop = "opacity-100";
      } else {
        state.showGoTop = "opacity-0";
      }
    },

    changeAuthPageToSignUp: (state) => {
      state.authPage = "signUp";
    },
    changeAuthPageToSignIn: (state) => {
      state.authPage = "signIn";
    },

    changeTheme(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
  },
});

export default featuresReducer.reducer;
export let featuresActions = featuresReducer.actions;
