import { useDispatch, useSelector } from "react-redux";
import { menuReducer } from "../../Store/menu.slice";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiToken, optionsType } from "../../Types/Types";
import { Link } from "react-router-dom";
import { featuresActions } from "../../Store/features.slice";
import { headerActions } from "../../Store/header.slice";
import "../../scrollbar.css";
export default function NavBar() {
  let [genres, setGenres] = useState<[] | null>(null);
  let { open } = useSelector((store: { menuReducer: { open: boolean } }) => {
    return store.menuReducer;
  });
  let { openMenu } = menuReducer.actions;
  let { firstPage } = featuresActions;
  let { clearSearchValue } = headerActions;
  let dispatch = useDispatch();
  async function getGenres(): Promise<void> {
    try {
      let options: optionsType = {
        url: "https://api.themoviedb.org/3/genre/movie/list",
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiToken} `,
        },
      };

      let { data } = await axios.request(options);
      setGenres(data.genres);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getGenres();
  }, []);
  function test(name: string) {
    dispatch(clearSearchValue());
    dispatch(openMenu());
    dispatch(firstPage());
    localStorage.setItem("genreName", name);
  }

  function sendMovieLanguage(language: string) {
    dispatch(clearSearchValue());
    dispatch(openMenu());
    dispatch(firstPage());

    localStorage.setItem("language", language);
  }

  function wishlistFavorites() {
    dispatch(clearSearchValue());
    dispatch(openMenu());
  }

  return (
    <nav
      id="listParent"
      className={`bg-headerAndNav custom-scrollbar fixed z-40 left-0 w-[250px] transition-transform duration-500 overflow-y-scroll top-[92px] bottom-0 ${
        open ? "translate-x-[0px]" : "-translate-x-[250px]"
      }`}
    >
      <div className="container ps-[55px] py-5 flex flex-col gap-5 ">
        <div className="flex flex-col  gap-3">
          <h4 className="text-xl  text-headingsColor font-semibold ">
            Movie Lists
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                onClick={wishlistFavorites}
                to="/favorite"
                className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
              >
                Favorite Movies
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                onClick={wishlistFavorites}
                className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
              >
                Watchlist
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col  gap-3">
          <h4 className="text-xl  text-headingsColor font-semibold ">Genre</h4>
          <ul className="flex flex-col gap-2 ">
            {genres?.map((genre: { id: number; name: string }) => (
              <li key={genre.id}>
                <Link
                  to={`/genre/${genre.id}`}
                  onClick={() => {
                    test(genre.name);
                  }}
                  className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col  gap-3">
          <h4 className="text-xl  text-headingsColor font-semibold ">
            Language
          </h4>
          <ul className="flex flex-col gap-2">
            <li
              onClick={() => {
                sendMovieLanguage("Arabic");
              }}
            >
              <Link
                to="/lang/ar"
                className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
              >
                Arabic
              </Link>
            </li>
            <li
              onClick={() => {
                sendMovieLanguage("English");
              }}
            >
              <Link
                to="/lang/en"
                className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
              >
                English
              </Link>
            </li>
            <li
              onClick={() => {
                sendMovieLanguage("French");
              }}
            >
              <Link
                to="/lang/fr"
                className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
              >
                French
              </Link>
            </li>
            <li
              onClick={() => {
                sendMovieLanguage("Spanish");
              }}
            >
              <Link
                to="/lang/es"
                className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
              >
                Spanish
              </Link>
            </li>
            <li
              onClick={() => {
                sendMovieLanguage("German");
              }}
            >
              <Link
                to="/lang/de"
                className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
              >
                German
              </Link>
            </li>
            <li
              onClick={() => {
                sendMovieLanguage("Hindi");
              }}
            >
              <Link
                to="/lang/hi"
                className="text-navTextColor text-lg hover:text-navbarHover transition-colors duration-300"
              >
                Hindi
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
