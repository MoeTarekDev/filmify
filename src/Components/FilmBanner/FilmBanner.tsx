import { useSelector } from "react-redux";
import placeHolder from "../../assets/placeholder.webp";
import FilmTopPart from "../FilmTopPart/FilmTopPart";
import { useState } from "react";
import moviePlaceHolder from "../../assets/movie-placeholder.webp";
import "../../scrollbar.css";
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {movieDetails && movieCredits && movieVideos && movieRelease ? (
        <div className="rounded-2xl  flex md:flex-row flex-col gap-10 relative py-10 px-5  before:rounded-2xl before:absolute before:inset-0 before:bg-black/90 before:z-10 before:w-full before:h-full ">
          <img
            className="w-full absolute z-0 inset-0 h-full rounded-2xl  object-cover "
            src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
            alt={`${movieDetails.title}` + ` back drop image`}
          />
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group rounded-2xl md:sticky relative top-0 max-w-[300px] w-full h-full  max-h-[450px] z-10"
          >
            <img
              className="rounded-2xl w-full h-full"
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`
                  : moviePlaceHolder
              }
              alt={`${movieDetails.title}` + ` poster`}
            />

            <FilmTopPart movieId={movieDetails.id} isHovered={isHovered} />
          </div>
          <div className="relative z-10 flex flex-col w-full overflow-x-hidden">
            <div className="mt-4">
              <h4 className="lg:text-6xl md:text-5xl sm:text-3xl text-2xl text-white line-clamp-1">
                {movieDetails.title}
              </h4>
              <div className="flex items-center gap-3 mt-3 text-bannerTextColor">
                <div className="flex items-center gap-2 ">
                  <span>
                    <i className="text-yellow-400 fa-solid fa-star"></i>
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
              <ul className="flex items-center genres-list gap-2 mt-2 text-bannerTextColor">
                {movieDetails.genres.map((genre: { name: string }, index) => (
                  <li key={index}>{genre.name}</li>
                ))}
              </ul>
              <p className="text-white py-2">{movieDetails.overview}</p>
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

              <div className=" w-full overflow-x-auto custom-scrollbar film-trailers flex gap-6 pb-2">
                {movieVideos
                  .slice(0, 5)
                  .map((video: { id: number; key: string }) => (
                    <iframe
                      key={video.id}
                      allowFullScreen={false}
                      className="min-w-[280px] md:min-w-[350px] sm:min-h-[200px] sm:min-w-[350px] lg:min-w-[500px] md:h-[220px] lg:h-[281px]  rounded-2xl "
                      src={
                        movieVideos
                          ? `https://www.youtube.com/embed/${video.key}?&theme=dark&color=white&rel=0`
                          : placeHolder
                      }
                    ></iframe>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
