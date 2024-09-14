import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteDetails } from "../../Store/movie.slice";
import Loading from "./../../Components/Loading/Loading";

import Film from "../../Components/Film/Film";
// @ts-ignore
import { Helmet } from "react-helmet";

export default function FavoriteMovies() {
  const { favorite, favoriteDetails, isPending } = useSelector(
    (store: {
      movieReducer: {
        favorite: [id: number];
        favoriteDetails: [{ id: number }];
        isPending: boolean;
      };
    }) => store.movieReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    favorite.forEach((id: number) => {
      if (!favoriteDetails.some((movie) => movie.id === id)) {
        dispatch(getFavoriteDetails(id));
      }
    });
  }, [favorite, dispatch, favoriteDetails]);

  const renderFavoriteMovies = () => {
    return favoriteDetails
      .filter((movie: { id: number }) => favorite.includes(movie.id))
      .map((movie: {}) => <Film movie={movie} />);
  };

  return (
    <>
      <Helmet>
        <title>Favorites</title>
        <meta
          name="description"
          content="Keep track of movies you want to watch and those you love. Add films to your personal watchlist for later viewing, and mark your favorites to easily revisit them anytime."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {isPending ? (
        <Loading />
      ) : (
        <section className="bg-myBackground genre pt-[150px] pb-[50px] min-h-screen">
          <div className="container px-5 flex flex-col">
            <h5 className="text-headingsColor text-3xl font-bold mt-3 self-start">
              My Favorite Movies
            </h5>
            <div className="grid-class gap-5 mt-5">
              {renderFavoriteMovies()}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
