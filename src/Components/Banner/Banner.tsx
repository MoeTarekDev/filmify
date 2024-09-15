import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";

import { CirclePlay } from "lucide-react";
import { Link } from "react-router-dom";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import BannerSkeleton from "../BannerSkeleton/BannerSkeleton";

export default function Banner({ bannerData, genres }: any) {
  let [runningNowFilm, setRunningNowFilm] = useState<any>(null);
  let [imageActive, setImageActive] = useState<number>(0);
  let [test, setTest] = useState<any>(0);

  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (bannerData && bannerData.length > 0) {
      setRunningNowFilm(bannerData[0]);

      const newIntervalId = setInterval(() => {
        setRunningNowFilm((prevFilm: any) => {
          if (prevFilm && bannerData) {
            const currentIndex = bannerData.findIndex(
              (film: { id: number }) => film.id === prevFilm.id
            );

            const nextIndex = (currentIndex + 1) % bannerData.length;
            return bannerData[nextIndex];
          }
          return null;
        });

        setImageActive((prev) => (prev + 1) % bannerData.length);
      }, 7000);

      setTest(newIntervalId);

      return () => clearInterval(newIntervalId);
    }
  }, [bannerData]);

  useEffect(() => {
    if (bannerData) {
      swiperRef.current = new Swiper(".swiper-container", {
        modules: [Navigation, Pagination, Mousewheel],

        slidesPerView: 3.5,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        autoplay: {
          delay: 7000,
          disableOnInteraction: true,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

      setRunningNowFilm(bannerData[0]);
    }
  }, [bannerData]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(imageActive);
    }
  }, [imageActive]);

  function changePoster(filmID: number) {
    setRunningNowFilm(bannerData ? bannerData[filmID] : null);
    setImageActive(filmID);
    clearInterval(test);
  }

  return (
    <>
      {bannerData && genres ? (
        <div className="banner min-w-[300px] max-w-[1610px] h-[615px] relative rounded-2xl before:absolute before:inset-0 before:bg-gradient-to-r from-stone-900 before:z-10 before:w-full before:h-full flex flex-col p-7  before:rounded-2xl overflow-hidden">
          <img
            className="w-full h-full rounded-2xl absolute z-0 inset-0 object-cover"
            src={`https://image.tmdb.org/t/p/w1280/${runningNowFilm?.backdrop_path}`}
            alt={`${runningNowFilm?.original_title}` + ` image`}
          />
          <div className="relative z-20 lg:ps-[100px] sm:ps-[40px]  pt-[100px] pb-[50px] lg:w-1/2 w-full sm:w-[80%] flex flex-col gap-3 rounded-2xl">
            <h4 className="lg:text-6xl md:text-5xl sm:text-3xl text-2xl text-white line-clamp-1">
              {runningNowFilm?.original_title}
            </h4>
            <div className="flex items-center gap-2 w-fit text-bannerTextColor ">
              <span>
                {runningNowFilm?.release_date?.split("").splice(0, 4)}
              </span>
              <span className="my-badge">
                {runningNowFilm?.vote_average?.toFixed(1)}
              </span>
            </div>
            <ul className="flex items-center gap-2">
              {runningNowFilm?.genre_ids?.map((genre: number) => (
                <li className="text-bannerTextColor" key={genre}>
                  {
                    genres?.filter((oneGenre: { id: number }) => {
                      return oneGenre.id === genre;
                    })[0].name
                  }
                </li>
              ))}
            </ul>
            <p className="text-white line-clamp-2">
              {runningNowFilm?.overview}
            </p>
            <Link to={`movie/${runningNowFilm?.id}`} className="btn-primary">
              <CirclePlay className="w-4 h-4" />
              <span>Watch Now</span>
            </Link>
          </div>
          <div className="swiper-container flex gap-3 self-end relative z-20  md:w-[400px] w-[450px] overflow-hidden ">
            <div className="swiper-wrapper">
              {bannerData.map(
                (
                  film: {
                    id: number;
                    poster_path: string;
                    original_title: string;
                  },
                  index: any
                ) => (
                  <img
                    key={film.id}
                    onClick={() => {
                      changePoster(index);
                    }}
                    className={` ${
                      imageActive === index ? "opacity-100" : "opacity-60"
                    } swiper-slide rounded-lg hover:opacity-100 cursor-pointer`}
                    src={`https://image.tmdb.org/t/p/w154/${film.poster_path}`}
                    alt={`${film?.original_title}` + ` poster`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <BannerSkeleton />
      )}
    </>
  );
}
