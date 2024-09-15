import axios from "axios";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import Banner from "../../Components/Banner/Banner";
import { apiToken, movieType, optionsType } from "../../Types/Types";

import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

import Film from "../../Components/Film/Film";
// @ts-ignore
import { Helmet } from "react-helmet";
import FilmsCarouselSkeleton from "../../Components/FilmsCarouselSkeleton/FilmsCarouselSkeleton";
export default function Home() {
  let [topRatedMovies, setTopRatedMovies] = useState<any>(null);
  let [trendingMovies, setTrendingMovies] = useState<any>(null);
  let [upcomingMovies, setUpcomingMovies] = useState<any>(null);
  let [bannerData, setBannerData] = useState<any>(null);
  let [genres, setGenres] = useState<any>(null);
  async function getBanner() {
    let options: optionsType = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/now_playing",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };

    return axios.request(options);
  }
  async function getGenres() {
    let options: optionsType = {
      url: "https://api.themoviedb.org/3/genre/movie/list",
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken} `,
      },
    };

    return axios.request(options);
  }
  async function getTopRatedMovies() {
    let options: optionsType = {
      url: "https://api.themoviedb.org/3/movie/top_rated",
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    return axios.request(options);
  }
  async function getTrendingMovies() {
    let options: optionsType = {
      url: "https://api.themoviedb.org/3/movie/popular",
      method: "GET",
      params: { page: "1" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    return axios.request(options);
  }
  async function getUpcomingMovies() {
    let options: optionsType = {
      url: "https://api.themoviedb.org/3/movie/upcoming",
      method: "GET",
      params: { page: "1" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    return axios.request(options);
  }

  async function getAllData() {
    const [x, y, topRated, trendingMovies, upcomingMovies] = await Promise.all([
      getBanner(),
      getGenres(),
      getTopRatedMovies(),
      getTrendingMovies(),
      getUpcomingMovies(),
    ]);
    setBannerData(x.data.results);
    setGenres(y.data.genres);
    setTopRatedMovies(topRated.data.results);
    setUpcomingMovies(upcomingMovies.data.results);
    setTrendingMovies(trendingMovies.data.results);
  }

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (topRatedMovies) {
      new Swiper(".swiper-container-two", {
        modules: [Navigation, Pagination, Mousewheel],

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
  }, [topRatedMovies, trendingMovies, upcomingMovies]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Filmify: Dive into the Best of Cinema</title>
        <meta
          name="description"
          content="Filmify offers a seamless experience to explore, discover, and enjoy a vast collection of films"
        />
      </Helmet>
      <main className="pt-[100px] bg-myBackground">
        <div className="container px-5 py-5">
          <Banner bannerData={bannerData} genres={genres} />
          {topRatedMovies ? (
            <div className="mt-[50px]">
              <h2 className="text-headingsColor text-2xl font-bold">
                Top Rated Movies
              </h2>
              <div className="mt-5 flex gap-3 swiper-container-two overflow-x-hidden mb-10 ">
                <div className="swiper-wrapper">
                  {topRatedMovies.map((movie: movieType) => (
                    <Film key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <FilmsCarouselSkeleton />
          )}
          {trendingMovies ? (
            <div className="mt-[50px]">
              <h2 className="text-headingsColor text-2xl font-bold">
                Trending Movies
              </h2>
              <div className="mt-5 flex gap-3 swiper-container-two overflow-x-hidden mb-10 ">
                <div className="swiper-wrapper">
                  {trendingMovies.map((movie: movieType) => (
                    <Film key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <FilmsCarouselSkeleton />
          )}

          {upcomingMovies ? (
            <div className="mt-[50px]">
              <h2 className="text-headingsColor text-2xl font-bold">
                Upcoming Movies
              </h2>
              <div className="mt-5 flex gap-3 swiper-container-two overflow-x-hidden mb-10 ">
                <div className="swiper-wrapper">
                  {upcomingMovies.map((movie: movieType) => (
                    <Film key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <FilmsCarouselSkeleton />
          )}
        </div>
      </main>
    </>
  );
}
