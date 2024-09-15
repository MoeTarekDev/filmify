export default function FilmBannerSkeleton() {
  return (
    <div className="rounded-2xl flex md:flex-row flex-col relative p-7 gap-10 min-w-[300px] max-w-[1610px] h-[1423px] sm:h-[1323px] md:h-[785px] animate-pulse bg-skeletonColor ">
      <div className=" rounded-2xl max-w-[300px]  w-full  h-[450px] bg-gray-400"></div>
      <div className="mt-4 w-full overflow-hidden">
        <div className="h-2.5 w-[30%] rounded-full bg-gray-400"></div>
        <div className="h-2.5 w-[25%] rounded-full my-3 bg-gray-400"></div>
        <div className="h-2.5 w-[40%] rounded-full bg-gray-400"></div>
        <div className="h-2.5 w-[80%] rounded-full mt-16 bg-gray-400"></div>
        <div className="h-2.5 w-[70%] rounded-full mt-2 bg-gray-400"></div>
        <div className="h-2.5 w-[60%] rounded-full mt-2 bg-gray-400"></div>
        <div className="flex gap-12 mt-10">
          <div className="h-2.5 w-[30%] rounded-full bg-gray-400"></div>
          <div className="w-[70%] flex flex-col gap-3">
            <div className="h-2.5 w-[80%] rounded-full bg-gray-400"></div>
            <div className="h-2.5 w-[70%]  rounded-full bg-gray-400"></div>
            <div className="h-2.5 w-[60%]  rounded-full bg-gray-400"></div>
          </div>
        </div>
        <div className="flex gap-5 mt-10">
          <div className="h-2.5 w-[60%]  rounded-full bg-gray-400"></div>
          <p className="text-white"></p>
        </div>
        <div className="w-full md:h-[180px] lg:h-[250px] overflow-x-hidden film-trailers  flex gap-6 pb-2 mt-7"></div>
      </div>
    </div>
  );
}
