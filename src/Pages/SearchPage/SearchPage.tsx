import { useDispatch, useSelector } from "react-redux";
import Film from "../../Components/Film/Film";
import Loading from "./../../Components/Loading/Loading";
import { movieType } from "../../Types/Types";
import { useEffect } from "react";
import { featuresActions, scrollUp } from "../../Store/features.slice";
import { ChevronUp } from "lucide-react";

export default function SearchPage() {
  let { searchValue, searchResults, isPending } = useSelector(
    (store: {
      headerReducer: {
        searchValue: string;
        searchResults: [];
        isPending?: boolean;
      };
    }) => {
      return store.headerReducer;
    }
  );
  let { showGoTop } = useSelector(function (store: {
    featuresReducer: {
      showGoTop: string;
    };
  }) {
    return store.featuresReducer;
  });
  let dispatch = useDispatch();
  let { setShowGoTop, setScrollPosition } = featuresActions;
  useEffect(() => {
    window.addEventListener("scroll", function () {
      dispatch(setScrollPosition());
      dispatch(setShowGoTop());
    });
  }, []);
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <section className="bg-myBackground pt-[150px] pb-[50px] min-h-screen">
          <div className="container px-5 ">
            <h4 className="text-primaryColor text-xl font-bold">Result for</h4>
            <h5 className="text-headingsColor text-3xl font-bold mt-3">
              {searchValue}
            </h5>
            <div className="grid-class gap-5 mt-5">
              {searchResults.map((movie: movieType) => (
                <div key={movie.id}>
                  <Film movie={movie} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollUp}
            className={`${showGoTop} flex fixed bottom-5 right-5 bg-otherPrimaryColor  items-center justify-center p-3 rounded-full z-[1000] transition-opacity duration-300`}
          >
            <ChevronUp className="text-white" />
          </button>
        </section>
      )}
    </>
  );
}
