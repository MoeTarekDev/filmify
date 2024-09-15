import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Swiper from "swiper";
import Banner from "../../Components/Banner/Banner";
import { apiToken, optionsType } from "../../Types/Types";

import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

// @ts-ignore
import { Helmet } from "react-helmet";
import TopRatedMovies from "../../Components/TopRatedMovies/TopRatedMovies";
import TrendingMovies from "../../Components/TrendingMovies/TrendingMovies";
import UpcomingMovies from "../../Components/UpcomingMovies/UpcomingMovies";
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

  const getAllData = useCallback(async () => {
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
  }, []);
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
          <TopRatedMovies topRatedMovies={topRatedMovies} />
          <TrendingMovies trendingMovies={trendingMovies} />
          <UpcomingMovies upcomingMovies={upcomingMovies} />
        </div>
      </main>
    </>
  );
}
