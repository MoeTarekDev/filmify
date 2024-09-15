export default function BannerSkeleton() {
  return (
    <div className="relative flex flex-col rounded-2xl p-7 min-w-[300px] max-w-[1610px] h-[615px] overflow-hidden animate-pulse ">
      <svg
        className="absolute inset-0 w-full h-full opacity-50 text-skeletonColor z-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
      <div className="relative z-20 lg:ps-[100px] sm:ps-[40px]  pt-[100px] pb-[50px] lg:w-1/2 w-full sm:w-[80%] flex flex-col gap-3 rounded-2xl">
        <div className="bg-skeletonColor h-2.5 rounded-full my-1 w-[50%]"></div>
        <div className="bg-skeletonColor h-2.5 rounded-full my-1 w-[30%]"></div>
        <div className="bg-skeletonColor h-2.5 rounded-full my-1 w-[40%]"></div>
        <div className="bg-skeletonColor h-2.5 rounded-full mt-1 w-[60%]"></div>
        <div className="bg-skeletonColor h-2.5 rounded-full mb-1 w-[60%]"></div>
        <div className="bg-skeletonColor h-[40px] rounded-lg my-1 w-[25%]"></div>
      </div>
      <div className="flex gap-3 self-end relative z-20 md:w-[400px] w-[450px] overflow-hidden ">
        <div className="max-h-[183px] min-h-[160px] bg-skeletonColor max-w-[122px] min-w-[108px] rounded-lg"></div>
        <div className="max-h-[183px] min-h-[160px] bg-skeletonColor max-w-[122px] min-w-[108px] rounded-lg"></div>
        <div className="max-h-[183px] min-h-[160px] bg-skeletonColor max-w-[122px] min-w-[108px] rounded-lg"></div>
        <div className="max-h-[183px] min-h-[160px] bg-skeletonColor max-w-[122px] min-w-[108px] rounded-lg"></div>
      </div>
    </div>
  );
}
// before:absolute before:inset-0 before:bg-gradient-to-r from-stone-900 before:z-10 before:w-full before:h-full before:rounded-2xl
