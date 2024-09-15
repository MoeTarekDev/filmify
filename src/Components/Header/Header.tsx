import { useEffect, useRef, useState } from "react";
import { menuActions } from "../../Store/menu.slice";
import { useDispatch, useSelector } from "react-redux";

import { getSearchResults, headerActions } from "../../Store/header.slice";
import { Link } from "react-router-dom";
import { userActions } from "./../../Store/user.slice";
import { featuresActions } from "../../Store/features.slice";
import moon from "../../assets/moon.webp";
import sun from "../../assets/sun.webp";
import { Menu, Search, X } from "lucide-react";
export default function Header() {
  let [openSearch, setOpenSearch] = useState<Boolean | false>(false);
  let [avatarMenu, setAvatarMenu] = useState<boolean>(false);
  let test = useRef<any>(0);

  let { open } = useSelector((store: { menuReducer: { open: boolean } }) => {
    return store.menuReducer;
  });
  let { openMenu } = menuActions;
  let dispatch = useDispatch();
  let { searchValue, isPending, isSearchEmpty } = useSelector(function (store: {
    headerReducer: {
      searchValue: string;
      isPending: boolean;
      isSearchEmpty: boolean;
    };
  }) {
    return store.headerReducer;
  });
  let { isDark } = useSelector(function (store: {
    featuresReducer: { isDark: boolean };
  }) {
    return store.featuresReducer;
  });
  let { userName, userImage } = useSelector(function (store: {
    userReducer: {
      userName: string;
      userImage: string;
    };
  }) {
    return store.userReducer;
  });
  let { changeTheme } = featuresActions;
  let { logOut } = userActions;
  function changeSearchValue(): void {
    setOpenSearch((prevValue) => !prevValue);
    dispatch(clearSearchValue());
  }

  let { setSearchValue, clearSearchValue } = headerActions;
  useEffect(() => {
    dispatch(getSearchResults(searchValue));
    watchInput();
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    if (isDark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDark]);
  function watchInput() {
    if (isSearchEmpty === false) {
      test.current.value = "";
    }
  }
  function handleAvatarMenu() {
    setAvatarMenu((prev) => !prev);
    dispatch(changeTheme());
  }

  function handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuBar = document.getElementById("menuBar");
    const listParent = document.getElementById("listParent");
    if (
      menuBar &&
      listParent &&
      !menuBar.contains(target) &&
      !listParent.contains(target) &&
      open
    ) {
      dispatch(openMenu());
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [open]);

  function closeAvatarMenu(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (
      !document.getElementById("avatarName")?.contains(target) &&
      !document.getElementById("avatarImage")?.contains(target) &&
      avatarMenu
    ) {
      setAvatarMenu(false);
    }
  }
  useEffect(() => {
    if (avatarMenu) {
      document.addEventListener("click", closeAvatarMenu);
    } else {
      document.removeEventListener("click", closeAvatarMenu);
    }

    return () => {
      document.removeEventListener("click", closeAvatarMenu);
    };
  }, [avatarMenu]);
  return (
    <>
      <header className="bg-headerAndNav fixed top-0 left-0 right-0 z-50">
        <div className="container px-5 flex items-center md:justify-between py-5">
          <div
            className={`flex items-center gap-5 md:flex ${
              openSearch ? "hidden" : "flex"
            }`}
          >
            <div
              id="menuBar"
              onClick={() => {
                dispatch(openMenu());
              }}
              className="cursor-pointer transition-colors duration-200 w-8 h-8 flex items-center justify-center dark:hover:bg-slate-50/20  hover:bg-slate-300/50 rounded-full"
            >
              <Menu className="text-xl text-barsLens" />
            </div>
            <h1 className={`text-4xl font-bold text-headingsColor `}>
              <Link
                to="/"
                onClick={() => {
                  dispatch(clearSearchValue());
                }}
              >
                Filmify
              </Link>
            </h1>
          </div>
          <div className="flex items-center gap-4 grow md:flex-grow-0">
            <div className="relative gap-2  md:gap-0 md:ms-0 rounded-md md:w-[300px] z-10 flex items-center grow md:flex-grow-0">
              <div
                onClick={changeSearchValue}
                className={` md:absolute ${
                  openSearch &&
                  "absolute px-2 py-0 ms-0 bg-transparent p-0 rounded-none "
                } md:px-2 md:py-0 ms-auto md:ms-0 bg-inputBackground md:bg-transparent rounded-md py-[18px] px-[24px] md:p-0  w-[32px] cursor-pointer md:cursor-default`}
              >
                {/* <i className={`fa-solid fa-magnifying-glass text-barsLens`}></i> */}
                <Search className="text-barsLens w-4 h-4  left-1/2 top-1/2 -translate-x-1/2 md:-translate-x-0" />
              </div>
              <div
                className={` absolute ${
                  isPending === true ? "block z-[5000]" : "hidden"
                } md:right-[10px] sm:right-[15%] right-[20%] mt-1`}
              >
                <span className="spinner"></span>
              </div>
              <input
                ref={test}
                onChange={(e) => {
                  dispatch(setSearchValue(e.target.value));
                }}
                type="text"
                className={`text-otherTextColor bg-inputBackground rounded-md outline-none  py-3  pe-2 ps-[32px] grow focus:ps-2 transition-all duration-300 focus:relative focus:z-50  focus:border-gray-500 border-transparent  border-2 hover:border-gray-500 md:block ${
                  openSearch ? "flex" : "hidden"
                }`}
                placeholder="Search any movie..."
              />
              <div
                onClick={changeSearchValue}
                className={`bg-inputBackground  items-center justify-center rounded-md py-[16px] px-[16px] md:hidden text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer ${
                  openSearch ? "flex" : "hidden"
                }`}
              >
                {/* <i className="fa-solid fa-x"></i> */}
                <X className="w-5 h-5" />
              </div>
            </div>
            {/* Avatar DropDown */}
            <div className="relative w-10 h-10 ">
              <button
                id="avatarImage"
                onClick={() => {
                  setAvatarMenu((prev) => !prev);
                }}
                className="flex text-sm w-full h-full bg-gray-800 rounded-full md:me-0 focus:ring-2 focus:ring-gray-400 hover:ring-gray-400 hover:ring-2"
                type="button"
              >
                <img
                  className="w-full h-full rounded-full"
                  src={userImage || `https://avatar.iran.liara.run/public/34`}
                  alt="user photo"
                />
              </button>

              <div
                className={`z-10 ${
                  avatarMenu ? "absolute" : "hidden"
                } bg-inputBackground divide-y divide-gray-100 rounded-lg shadow w-40 top-[50px] right-0 translate-x-50  text-otherTextColor`}
              >
                <div id="avatarName" className="px-4 py-3 text-sm">
                  <div className="font-medium truncate line-clamp-1 ">
                    Hello @{userName ? userName : ""}
                  </div>
                </div>
                <ul
                  className="py-2 text-sm hover:bg-profileMenuColor"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  <li>
                    <div
                      onClick={() => {
                        handleAvatarMenu();
                      }}
                      className="px-4 cursor-pointer py-2 flex items-center"
                    >
                      <span> Theme:</span>
                      <span className="flex items-center ms-1 gap-1">
                        {!isDark ? "Light" : "Dark"}
                        {!isDark ? (
                          <img className="w-5" src={sun} alt="Sun Icon" />
                        ) : (
                          <img className="w-5" src={moon} alt="Moon Icon" />
                        )}
                      </span>
                    </div>
                  </li>
                </ul>
                <div
                  onClick={() => {
                    dispatch(logOut());
                  }}
                  className=""
                >
                  <a
                    href="#"
                    className="block px-4 py-4 text-sm hover:bg-profileMenuColor rounded-b-lg"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
