import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../scrollbar.css";
import FilmTopPart from "../FilmTopPart/FilmTopPart";
import Video from "../Video/Video";
import VideosSkeleton from "../VideosSkeleton/VideosSkeleton";
import FilmBannerSkeleton from "../FilmBannerSkeleton/FilmBannerSkeleton";

export default function FilmBanner() {
  let { movieDetails, movieCredits, movieVideos, movieRelease } = useSelector(
    function (store: {
      movieReducer: {
        movieDetails: {
          id: number;
          title: string;
          poster_path: string;
          vote_average: number;
          runtime: number;
          genres: [];
          release_date: string;
          overview: string;
          backdrop_path: string;
        };
        movieCredits: {
          cast: [];
          crew: [{ name: string }];
        };
        movieVideos: [];
        movieRelease: [
          {
            release_dates: [
              { certification: string },
              { certification: string }
            ];
          }
        ];
      };
    }) {
      return store.movieReducer;
    }
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if movieVideos are available, and set loading accordingly
    if (movieVideos && movieVideos.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [movieVideos]);

  return (
    <>
      {movieDetails && movieCredits && movieRelease ? (
        <div className="rounded-2xl min-w-[300px] max-w-[1610px] h-[1423px] sm:h-[1323px] md:h-[785px] flex md:flex-row flex-col gap-10 relative py-10 px-5 before:rounded-2xl before:absolute before:inset-0 before:bg-black/90 before:z-10 before:w-full before:h-full ">
          <img
            className="w-full absolute z-0 inset-0 h-full rounded-2xl object-cover"
            src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
            alt={`${movieDetails.title}` + ` back drop image`}
            width={1280}
            height={720}
          />
          <div className="md:h-[705px] h-[450px] relative w-[300px] flex-shrink-0">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group rounded-2xl md:sticky relative top-0 w-[290px] md:w-[300px]  max-h-[450px] z-10 "
            >
              <img
                className="rounded-2xl w-full h-full object-cover"
                src={
                  movieDetails.poster_path &&
                  `https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`
                }
                alt={`${movieDetails.title}` + ` poster`}
                width={342}
                height={513}
              />
              <FilmTopPart movieId={movieDetails.id} isHovered={isHovered} />
            </div>
          </div>
          <div className="relative z-10 flex flex-col w-full overflow-hidden">
            <div className="mt-4">
              <h4 className="lg:text-6xl md:text-5xl sm:text-3xl text-2xl text-white line-clamp-1">
                {movieDetails.title}
              </h4>
              <div className="flex items-center gap-3 mt-3 text-bannerTextColor">
                <div className="flex items-center gap-2">
                  <span>
                    <Star
                      fill="rgb(250 204 21)"
                      className="text-yellow-400 w-4"
                    />
                  </span>
                  <span>{movieDetails.vote_average.toFixed(1)}</span>
                </div>
                <span>{movieDetails.runtime}m</span>
                <span>{movieDetails.release_date.split("-").splice(0, 1)}</span>
                <span className="my-badge">
                  {movieRelease[0]?.release_dates[0]?.certification ||
                    movieRelease[0]?.release_dates[1]?.certification}
                </span>
              </div>
              <ul className="flex flex-wrap items-center genres-list gap-2 mt-2 text-bannerTextColor">
                {movieDetails.genres.map((genre: { name: string }, index) => (
                  <li key={index}>{genre.name}</li>
                ))}
              </ul>
              <p className="text-white my-2 line-clamp-3">
                {movieDetails.overview}
              </p>
              <div className="flex gap-12 mt-3">
                <span className="text-bannerTextColor">Starring</span>
                <div className="text-white casting-list">
                  {movieCredits.cast
                    .slice(0, 10)
                    .map((oneCast: { name: string; cast_id: number }) => (
                      <span key={oneCast.cast_id}> {oneCast.name} </span>
                    ))}
                </div>
              </div>
              <div className="flex gap-5 mt-3">
                <span className="text-bannerTextColor">Directed By</span>
                <p className="text-white">{movieCredits?.crew[0]?.name}</p>
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-5 text-3xl">
              <h5 className="text-white">Trailers and Clips</h5>
              <div className="w-full h-[260px] lg:h-[250px] overflow-x-auto overflow-y-hidden custom-scrollbar film-trailers flex gap-6 pb-2">
                {isLoading ? (
                  <VideosSkeleton />
                ) : (
                  movieVideos
                    .slice(0, 5)
                    .map((video: { id: number; key: string }) => (
                      <Video key={video.id} video={video} />
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FilmBannerSkeleton />
      )}
    </>
  );
}
