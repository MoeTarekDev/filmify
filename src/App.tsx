import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { myStore } from "./Store/Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
const Home = lazy(() => import("./Pages/Home/Home"));
const MoviePage = lazy(() => import("./Pages/MoviePage/MoviePage"));
const GenrePage = lazy(() => import("./Pages/GenrePage/GenrePage"));
const LanguagePage = lazy(() => import("./Pages/LanguagePage/LanguagePage"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"));
const FavoriteMovies = lazy(
  () => import("./Pages/FavoriteMovies/FavoriteMovies")
);
const WishlistPage = lazy(() => import("./Pages/WishlistPage/WishlistPage"));
const Auth = lazy(() => import("./Pages/Auth/Auth"));
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ProtectedPage from "./Components/ProtectedPage/ProtectedPage";
import Loading from "./Components/Loading/Loading";

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
          <Suspense fallback={<Loading />}>
            <RouterProvider router={routes}></RouterProvider>
          </Suspense>
        </Provider>
        <Toaster richColors position="top-center" theme="light" />
      </QueryClientProvider>
    </>
  );
}

export default App;
