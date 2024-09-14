import FilmBanner from "../../Components/FilmBanner/FilmBanner";
import { useEffect, useState } from "react";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieRelease,
  getMovieVideos,
} from "../../Store/movie.slice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiToken, movieType, optionsType } from "../../Types/Types";
import axios from "axios";
import Film from "../../Components/Film/Film";
import Swiper from "swiper";
import Loading from "../../Components/Loading/Loading";
// @ts-ignore
import { Helmet } from "react-helmet";

export default function MoviePage() {
  let { id } = useParams();
  let [movieRecommendations, setMovieRecommendations] = useState<[{}] | null>(
    null
  );
  let dispatch = useDispatch();

  async function getRecommendations(id: any) {
    const options: optionsType = {
      url: `https://api.themoviedb.org/3/movie/${id}/recommendations`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);
    setMovieRecommendations(data.results);
  }
  let { movieDetails, isPending } = useSelector(function (store: {
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
      };
      isPending: boolean;

      movieVideos: [];
    };
  }) {
    return store.movieReducer;
  });

  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getMovieCredits(id));
    dispatch(getMovieVideos(id));
    dispatch(getMovieRelease(id));
    getRecommendations(id);
  }, [id]);
  useEffect(() => {
    if (movieRecommendations) {
      new Swiper(".swiper-container-three", {
        spaceBetween: 10,
        loop: false,
        slidesPerView: 2.1,
        breakpoints: {
          470: {
            slidesPerView: 3.2,
          },
          700: {
            slidesPerView: 4.2,
          },
          1024: {
            slidesPerView: 5.5,
          },
        },
        mousewheel: {
          forceToAxis: true,
        },
      });
    }
  }, [movieRecommendations]);

  return (
    <>
      <Helmet>
        <title>{movieDetails ? movieDetails.title : ""}</title>
        <meta
          name="description"
          content={movieDetails ? movieDetails.overview : ""}
        />
        <meta
          property="og:title"
          content={movieDetails ? movieDetails.title : ""}
        />
        <meta
          property="og:description"
          content={movieDetails ? movieDetails.overview : ""}
        />
        <meta
          property="og:image"
          content={movieDetails ? movieDetails.poster_path : ""}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={movieDetails ? movieDetails.title : ""}
        />
        <meta
          name="twitter:description"
          content={movieDetails ? movieDetails.overview : ""}
        />
        <meta
          name="twitter:image"
          content={movieDetails ? movieDetails.poster_path : ""}
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {isPending ? (
        <Loading />
      ) : (
        <section className="bg-myBackground pt-[120px] pb-[50px] min-h-screen ">
          <div className="container px-5 ">
            <FilmBanner />

            <div className="mt-[50px]">
              <h5 className="text-headingsColor text-2xl font-bold">
                You May Also Like
              </h5>
              <div className="mt-5 flex gap-3 swiper-container-three overflow-x-hidden mb-10 ">
                <div className="swiper-wrapper ">
                  {movieRecommendations?.map((movie: movieType) => (
                    <Film key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
