import axios from "axios";
import { apiToken, optionsType } from "../../Types/Types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { featuresActions, scrollUp } from "../../Store/features.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navigator from "../../Components/Navigator/Navigator";
// @ts-ignore
import { Helmet } from "react-helmet";
import MoviesList from "../../Components/MoviesList/MoviesList";
import { ChevronUp } from "lucide-react";

export default function LanguagePage() {
  let { id } = useParams();
  let langName = localStorage.getItem("language");

  let { page, showGoTop } = useSelector(function (store: {
    featuresReducer: {
      page: number;
      scrollPosition: number;
      showGoTop: string;
    };
  }) {
    return store.featuresReducer;
  });
  let { setShowGoTop, setScrollPosition } = featuresActions;
  let dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("scroll", function () {
      dispatch(setScrollPosition());
      dispatch(setShowGoTop());
    });
  }, []);
  async function getSelectedLang() {
    let options: optionsType = {
      url: "https://api.themoviedb.org/3/discover/movie",
      method: "GET",
      params: {
        page,
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        with_original_language: id,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };

    return await axios.request(options);
  }

  let { data } = useQuery({
    queryKey: ["Lang", id, page],
    queryFn: getSelectedLang,
  });

  return (
    <>
      <Helmet>
        <title>{`${langName} Movies`}</title>
        <meta
          name="description"
          content="Discover films from around the world. Browse movies by language to experience diverse storytelling and expand your cinematic horizons."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <section className="bg-myBackground genre pt-[150px] pb-[50px] min-h-screen">
        <div className="container px-5 flex flex-col">
          <h5 className="text-headingsColor text-3xl font-bold mt-3 self-start">
            {`All ${langName} Movies`}
          </h5>
          <MoviesList data={data} />
          <Navigator />
        </div>
        <button
          onClick={scrollUp}
          className={`${showGoTop} flex fixed bottom-5 right-5 bg-otherPrimaryColor  items-center justify-center p-3 rounded-full z-[1000] transition-opacity duration-300`}
        >
          <ChevronUp className="text-white" />
        </button>
      </section>
    </>
  );
}
