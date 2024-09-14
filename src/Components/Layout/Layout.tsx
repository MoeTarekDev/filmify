import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import SearchPage from "../../Pages/SearchPage/SearchPage";
import { useSelector } from "react-redux";

export default function Layout() {
  let { searchValue } = useSelector(
    (store: { headerReducer: { searchValue: string } }) => {
      return store.headerReducer;
    }
  );

  return (
    <>
      <Header />
      <NavBar />
      {searchValue != "" ? <SearchPage /> : <Outlet />}
    </>
  );
}
