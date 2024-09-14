import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiToken, optionsType } from "../Types/Types";

export let getMovieDetails: any = createAsyncThunk(
  "movie/getMovieDetails",
  async (id) => {
    const options: optionsType = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);

    return data;
  }
);
export let getMovieCredits: any = createAsyncThunk(
  "movie/getMovieCredits",
  async (id) => {
    const options: optionsType = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);

    return data;
  }
);
export let getMovieVideos: any = createAsyncThunk(
  "movie/getMovieVideos",
  async (id) => {
    const options: optionsType = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/videos`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);

    return data.results;
  }
);
export let getMovieRelease: any = createAsyncThunk(
  "movie/getMovieRelease",
  async (id) => {
    const options: optionsType = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/release_dates`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);

    return data.results;
  }
);
export let getWishlistDetails: any = createAsyncThunk(
  "movie/getWishlistDetails",
  async (id) => {
    const options: optionsType = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);

    return data;
  }
);
export let getFavoriteDetails: any = createAsyncThunk(
  "movie/getFavoriteDetails",
  async (id) => {
    const options: optionsType = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);

    return data;
  }
);
type initialStateType = {
  movieDetails: [{}] | null;
  movieCredits: [{}] | null;
  movieVideos: [{}] | null;
  movieRelease: [{}] | null;
  favoriteDetails: any[];
  wishlistDetails: any[];
  isPending: boolean;
  isError: boolean;
  favorite: number[];
  wishlist: number[];
};

const initialState: initialStateType = {
  movieDetails: null,
  movieCredits: null,
  movieVideos: null,
  movieRelease: null,
  favoriteDetails: [],
  wishlistDetails: [],
  isPending: false,
  isError: false,
  favorite: JSON.parse(localStorage.getItem("favorites") ?? "[]"),
  wishlist: JSON.parse(localStorage.getItem("wishlist") ?? "[]"),
};

let movieReducer = createSlice({
  name: "movie",
  initialState,

  reducers: {
    favoriteToLocalStorage: (state, action) => {
      const movieId = action.payload;
      const index = state.favorite.indexOf(movieId);
      let newFavorites;

      if (index > -1) {
        newFavorites = state.favorite.filter((id) => id !== movieId);
      } else {
        newFavorites = [...state.favorite, movieId];
      }

      state.favorite = newFavorites;
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    },
    wishlistToLocalStorage: (state, action) => {
      const movieId = action.payload;
      const movieIndex = state.wishlist.indexOf(movieId);
      let newWishList;

      if (movieIndex > -1) {
        newWishList = state.wishlist.filter((id) => id !== movieId);
      } else {
        newWishList = [...state.wishlist, movieId];
      }
      state.wishlist = newWishList;
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
      state.isPending = false;
      state.isError = false;
    });
    builder.addCase(getMovieDetails.pending, (state) => {
      state.movieDetails = null;
      state.isPending = true;
      state.isError = false;
    });
    builder.addCase(getMovieDetails.rejected, (state) => {
      state.movieDetails = null;
      state.isPending = false;
      state.isError = true;
    });
    builder.addCase(getMovieCredits.fulfilled, (state, action) => {
      state.movieCredits = action.payload;
      state.isPending = false;
      state.isError = false;
    });
    builder.addCase(getMovieCredits.pending, (state) => {
      state.movieCredits = null;
      state.isPending = true;
      state.isError = false;
    });
    builder.addCase(getMovieCredits.rejected, (state) => {
      state.movieCredits = null;
      state.isPending = false;
      state.isError = true;
    });
    builder.addCase(getMovieVideos.fulfilled, (state, action) => {
      state.movieVideos = action.payload.filter(
        (video: { site: string; type: string }) => {
          return (
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser")
          );
        }
      );

      state.isPending = false;
      state.isError = false;
    });
    builder.addCase(getMovieVideos.pending, (state) => {
      state.movieVideos = null;
      state.isPending = true;
      state.isError = false;
    });
    builder.addCase(getMovieVideos.rejected, (state) => {
      state.movieVideos = null;
      state.isPending = false;
      state.isError = true;
    });
    builder.addCase(getMovieRelease.fulfilled, (state, action) => {
      state.movieRelease = action.payload.filter(
        (one: { iso_3166_1: string }) => {
          return one.iso_3166_1 === "US";
        }
      );

      state.isPending = false;
      state.isError = false;
    });
    builder.addCase(getMovieRelease.pending, (state) => {
      state.movieRelease = null;
      state.isPending = true;
      state.isError = false;
    });
    builder.addCase(getMovieRelease.rejected, (state) => {
      state.movieRelease = null;
      state.isPending = false;
      state.isError = true;
    });

    builder.addCase(getFavoriteDetails.fulfilled, (state, action) => {
      if (
        !state.favoriteDetails.some((movie) => movie.id === action.payload.id)
      ) {
        state.favoriteDetails.push(action.payload);
      }
      state.isPending = false;
      state.isError = false;
    });
    builder.addCase(getFavoriteDetails.pending, (state) => {
      state.isPending = true;
      state.isError = false;
    });
    builder.addCase(getFavoriteDetails.rejected, (state) => {
      state.isPending = false;
      state.isError = true;
    });
    builder.addCase(getWishlistDetails.fulfilled, (state, action) => {
      if (
        !state.wishlistDetails.some((movie) => movie.id === action.payload.id)
      ) {
        state.wishlistDetails.push(action.payload);
      }
      state.isPending = false;
      state.isError = false;
    });
    builder.addCase(getWishlistDetails.pending, (state) => {
      state.isPending = true;
      state.isError = false;
    });
    builder.addCase(getWishlistDetails.rejected, (state) => {
      state.isPending = false;
      state.isError = true;
    });
  },
});

export default movieReducer.reducer;
export let movieActions = movieReducer.actions;
