import NotFound from "../../assets/notFound.webp";
import NotFoundDark from "../../assets/notFound-dark.webp";
import { useSelector } from "react-redux";
// @ts-ignore
import { Helmet } from "react-helmet";
export default function PageNotFound() {
  let { isDark } = useSelector(function (store: {
    featuresReducer: { isDark: boolean };
  }) {
    return store.featuresReducer;
  });
  return (
    <>
      <Helmet>
        <title>Page Not Found (404)</title>
        <meta
          name="description"
          content="Oops! The scene you're looking for seems to be missing from our reel. Don't worry, there are plenty of other great movies to discover. Try using the search bar or navigate back to our homepage to continue your cinematic journey."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <section className=" w-full min-h-screen bg-myBackground">
        <div className="container px-5 pt-[130px] md:mt-0 pb-[100px] md:pb-0 flex md:flex-row flex-col justify-center items-center w-full h-full gap-10">
          <img
            className="w-[250px]"
            src={isDark ? NotFoundDark : NotFound}
            alt="Page Not Found image"
          />
          <div className="flex flex-col justify-center gap-4">
            <div className="flex md:flex-col flex-row items-center gap-2 justify-center flex-wrap">
              <h3 className="text-headingsColor font-bold  text-3xl md:text-6xl uppercase text-center ">
                A W W W . . . D o n ' t
              </h3>
              <span className="text-headingsColor font-bold text-3xl md:text-6xl uppercase text-center md:inline-block md:w-full md:mt-2">
                C r y .
              </span>
            </div>
            <div>
              <p className="text-textColor text-center text-lg">
                It's just a 404 Error!
              </p>
              <p className="text-textColor text-center text-lg">
                What you’re looking for may have been misplaced in Long Term
                Memory.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
