import { Link } from "react-router-dom";
import { headerActions } from "../../Store/header.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FilmTopPart from "../FilmTopPart/FilmTopPart";
import moviePlaceHolder from "../../assets/movie-placeholder.webp";
import { Star } from "lucide-react";
import FilmSkeleton from "../FilmSkeleton/FilmSkeleton";
import { scrollUp } from "../../Store/features.slice";

export default function Film(props: any) {
  let { movie } = props;
  let dispatch = useDispatch();
  let { clearSearchValue } = headerActions;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {movie ? (
        <div className={`swiper-slide h-full flex flex-col justify-between`}>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full rounded-lg relative group grow `}
          >
            <Link
              className="relative z-[10] h-full"
              onClick={() => {
                dispatch(clearSearchValue());
                scrollUp();
              }}
              to={`/movie/${movie.id}`}
            >
              <img
                loading="lazy"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                    : moviePlaceHolder
                }
                alt={`${movie.original_title}` + " poster"}
                className="rounded-lg w-full h-full relative inset-0 z-0 object-cover"
                width={392}
                height={588}
              />
            </Link>
          </div>
          <FilmTopPart movieId={movie.id} isHovered={isHovered} />
          <div className="mt-2">
            <Link
              onClick={() => {
                dispatch(clearSearchValue());
              }}
              to={`/movie/${movie.id}`}
              className="text-xl text-otherTextColor font-semibold line-clamp-1"
            >
              {movie.title}
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {/* <i className="text-yellow-400 fa-solid fa-star"></i> */}
                <Star fill="rgb(250 204 21)" className="text-yellow-400 w-4" />
                <span className="text-ratingColor">
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>
              <span className="my-badge text-sm">
                {movie.release_date?.split("").splice(0, 4)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <FilmSkeleton />
      )}
    </>
  );
}
