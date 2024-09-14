import axios from "axios";
import Film from "../../Components/Film/Film";
import { apiToken, optionsType } from "../../Types/Types";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
import { featuresActions, scrollUp } from "../../Store/features.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navigator from "../../Components/Navigator/Navigator";
// @ts-ignore
import { Helmet } from "react-helmet";

export default function GenrePage() {
  let { id } = useParams();
  let genreName = localStorage.getItem("genreName");

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
  async function getSelectedGenre() {
    let options: optionsType = {
      url: "https://api.themoviedb.org/3/discover/movie",
      method: "GET",
      params: {
        page,
        with_genres: id,
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    };

    return await axios.request(options);
  }

  let { data, isFetching } = useQuery({
    queryKey: ["Genre", id, page],
    queryFn: getSelectedGenre,
  });
  if (isFetching) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{`${genreName} Movies`}</title>
        <meta
          name="description"
          content="Explore movies by genre. From action-packed thrillers to heartwarming romances, find films that match your mood and preferences."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <section className="bg-myBackground genre pt-[150px] pb-[50px] min-h-screen">
        <div className="container px-5 flex flex-col">
          <h5 className="text-headingsColor text-3xl font-bold mt-3 self-start">
            {`All ${genreName} Movies`}
          </h5>
          <div className="grid-class gap-5 mt-5">
            {data?.data?.results.map((movie: { id: number }) => (
              <div key={movie.id}>
                <Film movie={movie} />
              </div>
            ))}
          </div>
          <Navigator />
        </div>
        <button
          onClick={scrollUp}
          className={`${showGoTop} flex fixed bottom-5 right-5 bg-otherPrimaryColor  items-center justify-center p-4 rounded-full z-[1000] transition-opacity duration-300`}
        >
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      </section>
    </>
  );
}
