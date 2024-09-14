import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistDetails } from "../../Store/movie.slice";
import Loading from "./../../Components/Loading/Loading";

import Film from "../../Components/Film/Film";
// @ts-ignore
import { Helmet } from "react-helmet";

export default function WishlistPage() {
  const { wishlist, wishlistDetails, isPending } = useSelector(
    (store: {
      movieReducer: {
        wishlist: [id: number];
        wishlistDetails: [{ id: number }];
        isPending: boolean;
      };
    }) => store.movieReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    wishlist.forEach((id: number) => {
      if (!wishlistDetails.some((movie) => movie.id === id)) {
        dispatch(getWishlistDetails(id));
      }
    });
  }, [wishlist, dispatch, wishlistDetails]);

  const renderFavoriteMovies = () => {
    return wishlistDetails
      .filter((movie: { id: number }) => wishlist.includes(movie.id))
      .map((movie: {}) => <Film movie={movie} />);
  };

  return (
    <>
      <Helmet>
        <title>WatchList</title>
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
              My Watchlist
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
