import { Provider } from "react-redux";
import "./App.css";
import { myStore } from "./Store/Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import MoviePage from "./Pages/MoviePage/MoviePage";
import GenrePage from "./Pages/GenrePage/GenrePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LanguagePage from "./Pages/LanguagePage/LanguagePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import FavoriteMovies from "./Pages/FavoriteMovies/FavoriteMovies";
import WishlistPage from "./Pages/WishlistPage/WishlistPage";
import Auth from "./Pages/Auth/Auth";
import { Toaster } from "sonner";
import ProtectedPage from "./Components/ProtectedPage/ProtectedPage";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedPage>
          <Layout />
        </ProtectedPage>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "movie/:id", element: <MoviePage /> },
        { path: "genre/:id", element: <GenrePage /> },
        { path: "lang/:id", element: <LanguagePage /> },
        { path: "favorite", element: <FavoriteMovies /> },
        { path: "wishlist", element: <WishlistPage /> },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  let myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <Provider store={myStore}>
          <RouterProvider router={routes}></RouterProvider>
        </Provider>
        <Toaster richColors position="top-center" theme="light" />
      </QueryClientProvider>
    </>
  );
}

export default App;
