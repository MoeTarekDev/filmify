import { movieType } from "../../Types/Types";
import Film from "../Film/Film";
import FilmsCarouselSkeleton from "../FilmsCarouselSkeleton/FilmsCarouselSkeleton";

export default function TrendingMovies({ trendingMovies }: any) {
  if (!trendingMovies) return <FilmsCarouselSkeleton />;

  return (
    <div className="mt-[50px]">
      <h2 className="text-headingsColor text-2xl font-bold">Trending Movies</h2>
      <div className="mt-5 flex gap-3 swiper-container-two overflow-x-hidden mb-10 ">
        <div className="swiper-wrapper">
          {trendingMovies.map((movie: movieType) => (
            <Film key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
