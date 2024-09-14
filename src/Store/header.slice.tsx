import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiToken, movieType, optionsType } from "../Types/Types";
import axios from "axios";

export const getSearchResults: any = createAsyncThunk(
  "search/getSearchResults",
  async function (searchValue: string): Promise<[{}]> {
    const options: optionsType = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: `${searchValue ? searchValue : "a"}`,
        include_adult: false,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);

    return data.results;
  }
);
type initialStateType = {
  searchValue: string;
  searchResults: [{}] | null;
  isSearchEmpty: boolean;
  isPending: boolean;
  isError: boolean;
};

const initialState: initialStateType = {
  searchValue: "",
  searchResults: null,
  isPending: false,
  isSearchEmpty: true,
  isError: false,
};
let headerReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: function (state, action) {
      state.searchValue = action.payload;
      state.isSearchEmpty = true;
    },
    clearSearchValue(state) {
      state.searchValue = "";
      state.isSearchEmpty = !state.isSearchEmpty;
    },
  },

  extraReducers: function (builder) {
    builder.addCase(getSearchResults.fulfilled, function (state, action) {
      state.searchResults = action.payload.filter(
        (single: movieType) => single.backdrop_path !== null
      );
      state.isPending = false;
      state.isError = false;
    });
    builder.addCase(getSearchResults.pending, function (state) {
      state.searchResults = null;
      state.isPending = true;
      state.isError = false;
    });

    builder.addCase(getSearchResults.rejected, function (state) {
      state.searchResults = null;
      state.isPending = false;
      state.isError = true;
    });
  },
});

export default headerReducer.reducer;
export let headerActions = headerReducer.actions;
