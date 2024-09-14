import axios from "axios";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import Banner from "../../Components/Banner/Banner";
import { apiToken, movieType, optionsType } from "../../Types/Types";

import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

import Film from "../../Components/Film/Film";
import Loading from "../../Components/Loading/Loading";
// @ts-ignore
import { Helmet } from "react-helmet";
export default function Home() {
  let [topRatedMovies, setTopRatedMovies] = useState<[{}] | null>(null);
  let [trendingMovies, setTrendingMovies] = useState<[{}] | null>(null);
  let [upcomingMovies, setUpcomingMovies] = useState<[{}] | null>(null);
  async function getTopRatedMovies() {
    let options: optionsType = {
      url: "https://api.themoviedb.org/3/movie/top_rated",
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let { data } = await axios.request(options);
    setTopRatedMovies(data.results);
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
    let { data } = await axios.request(options);
    setUpcomingMovies(data.results);
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
    let { data } = await axios.request(options);
    setTrendingMovies(data.results);
  }
  useEffect(() => {
    getTopRatedMovies();
    getTrendingMovies();
    getUpcomingMovies();
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
          {topRatedMovies && trendingMovies && upcomingMovies ? (
            <>
              <Banner />
              <div className="mt-[50px]">
                <h2 className="text-headingsColor text-2xl font-bold">
                  Top Rated Movies
                </h2>
                <div className="mt-5 flex gap-3 swiper-container-two overflow-x-hidden mb-10 ">
                  <div className="swiper-wrapper">
                    {topRatedMovies ? (
                      topRatedMovies.map((movie: movieType) => (
                        <Film key={movie.id} movie={movie} />
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-[50px]">
                <h2 className="text-headingsColor text-2xl font-bold">
                  Trending Movies
                </h2>
                <div className="mt-5 flex gap-3 swiper-container-two overflow-x-hidden mb-10 ">
                  <div className="swiper-wrapper">
                    {trendingMovies ? (
                      trendingMovies.map((movie: movieType) => (
                        <Film key={movie.id} movie={movie} />
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-[50px]">
                <h2 className="text-headingsColor text-2xl font-bold">
                  Upcoming Movies
                </h2>
                <div className="mt-5 flex gap-3 swiper-container-two overflow-x-hidden mb-10 ">
                  <div className="swiper-wrapper">
                    {upcomingMovies ? (
                      upcomingMovies.map((movie: movieType) => (
                        <Film key={movie.id} movie={movie} />
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </main>
    </>
  );
}
