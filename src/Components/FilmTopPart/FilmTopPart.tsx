import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../Store/movie.slice";
import { Bookmark, Heart } from "lucide-react";

export default function FilmTopPart(props: any) {
  let { movieId, isHovered } = props;
  let iconClass = useRef<any>(null);
  let iconClassTwo = useRef<any>(null);
  let dispatch = useDispatch();
  let [isAddedToFavorites, setIsAddedToFavorites] = useState<boolean>(false);
  let [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false);
  let [alsoHovered, setAlsoHovered] = useState(false);
  let { favorite, wishlist } = useSelector(function (store: {
    movieReducer: { favorite: number[]; wishlist: number[] };
  }) {
    return store.movieReducer;
  });
  let { favoriteToLocalStorage, wishlistToLocalStorage } = movieActions;

  useEffect(() => {
    setIsAddedToFavorites(favorite.includes(movieId));
    setIsAddedToWishlist(wishlist.includes(movieId));
  }, [favorite, wishlist, movieId]);
  const handleMouseOver = () => {
    if (iconClass.current) {
      if (!isAddedToWishlist) {
        iconClass.current.classList.add("fill-white");
      } else {
        iconClass.current.classList.remove("fill-white");
      }
    }
  };

  const handleMouseLeave = () => {
    if (iconClass.current) {
      if (!isAddedToWishlist) {
        iconClass.current.classList.remove("fill-white");
      } else {
        iconClass.current.classList.add("fill-white");
      }
    }
  };

  const handleMouseOverTwo = () => {
    if (iconClassTwo.current) {
      if (!isAddedToFavorites) {
        iconClassTwo.current.classList.add("fill-white");
      } else {
        iconClassTwo.current.classList.remove("fill-white");
      }
    }
  };

  const handleMouseLeaveTwo = () => {
    if (iconClassTwo.current) {
      if (!isAddedToFavorites) {
        iconClassTwo.current.classList.remove("fill-white");
      } else {
        iconClassTwo.current.classList.add("fill-white");
      }
    }
  };
  return (
    <>
      <div
        onMouseEnter={() => setAlsoHovered(true)}
        onMouseLeave={() => setAlsoHovered(false)}
        className={`absolute w-full top-2 right-0 items-start justify-end gap-3 mr-2 z-10 flex ${
          isHovered || alsoHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <span
          onClick={() => {
            dispatch(favoriteToLocalStorage(movieId));
          }}
          className="flex items-center  justify-center p-2 rounded-lg bg-gray-800/50 cursor-pointer group-[test]:"
        >
          <Heart
            ref={iconClassTwo}
            onMouseOver={handleMouseOverTwo}
            onMouseLeave={handleMouseLeaveTwo}
            className="hover:text-white  text-white w-6 h-6"
            fill={`${isAddedToFavorites ? "white" : "transparent"}`}
          />
        </span>
        <span
          onClick={() => {
            dispatch(wishlistToLocalStorage(movieId));
          }}
          className="flex items-center justify-center py-2 px-3 rounded-lg bg-gray-800/50 cursor-pointer"
        >
          <Bookmark
            ref={iconClass}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className="hover:text-white  text-white w-6 h-6 "
            fill={`${isAddedToWishlist ? "white" : "transparent"}`}
          />
        </span>
      </div>
    </>
  );
}
