export default function FilmSkeleton() {
  return (
    <div className="min-w-[184.53px] max-w-[284.5px] min-h-[306.5px] max-h-[487px] rounded-lg flex flex-col">
      <div className="w-full h-full bg-skeletonColor rounded-lg "></div>
      <div className="flex flex-col gap-3 mt-3">
        <div className="h-2.5 rounded-full w-[50%] bg-skeletonColor"></div>
        <div className="h-2.5 rounded-full w-[80%] bg-skeletonColor"></div>
      </div>
    </div>
  );
}
