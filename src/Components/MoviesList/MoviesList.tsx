import Film from "../Film/Film";

export default function MoviesList({ data }: any) {
  if (!data) {
    return (
      <div className="h-[13730px] sm:h-[5190px] md:h-[3235px] lg:h-[2255px] w-full relative"></div>
    );
  }
  return (
    <div className="grid-class gap-5 mt-5">
      {data.data.results.map((movie: { id: number }) => (
        <div key={movie.id}>
          <Film movie={movie} />
        </div>
      ))}
    </div>
  );
}
