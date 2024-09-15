import FilmSkeleton from "../FilmSkeleton/FilmSkeleton";

export default function FilmsCarouselSkeleton() {
  return (
    <div className="mt-[50px] w-full min-h-[312px] max-h-[540px] animate-pulse">
      <div className="h-2.5 rounded-full w-[10%] bg-skeletonColor"></div>
      <div className="mt-5 flex gap-3 overflow-x-hidden mb-10 ">
        <FilmSkeleton />
        <FilmSkeleton />
        <FilmSkeleton />
        <FilmSkeleton />
        <FilmSkeleton />
        <FilmSkeleton />
        <FilmSkeleton />
        <FilmSkeleton />
      </div>
    </div>
  );
}
