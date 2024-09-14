import { useDispatch, useSelector } from "react-redux";
import { featuresActions } from "../../Store/features.slice";

export default function Navigator() {
  let { page } = useSelector(function (store: {
    featuresReducer: {
      page: number;
      scrollPosition: number;
      showGoTop: string;
    };
  }) {
    return store.featuresReducer;
  });
  let { increasePage, decreasePage, firstPage } = featuresActions;
  let dispatch = useDispatch();

  return (
    <>
      <div className="join mt-7 border-otherPrimaryColor self-center rounded-lg ">
        <button
          onClick={() => {
            dispatch(decreasePage());
          }}
          className="join-item btn bg-otherPrimaryColor border-otherPrimaryColor rounded-l-lg text-white"
        >
          «
        </button>
        <button
          onClick={() => {
            dispatch(firstPage());
          }}
          className="join-item btn relative group overflow-y-hidden bg-otherPrimaryColor border-otherPrimaryColor  text-white"
        >
          <span
            className={` ${
              page > 1 ? "inline-block" : "hidden"
            } -translate-y-8 absolute group-hover:-translate-y-0 transition-transform duration-300 group-hover:static`}
          >
            Page 1
          </span>
          <span
            className={`${
              page > 1 ? "group-hover:-translate-y-8 group-hover:absolute" : ""
            }  transition-transform duration-300`}
          >
            Page {page}
          </span>
        </button>
        <button
          onClick={() => {
            dispatch(increasePage());
          }}
          className="join-item btn bg-otherPrimaryColor border-otherPrimaryColor rounded-r-lg text-white"
        >
          »
        </button>
      </div>
    </>
  );
}
