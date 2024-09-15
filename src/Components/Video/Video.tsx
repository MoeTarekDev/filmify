export default function Video({ video }: any) {
  return (
    <iframe
      key={video.id}
      loading="lazy"
      allowFullScreen={false}
      className="min-w-[380px] md:min-w-[350px] sm:h-[200px] sm:min-w-[350px] h-[250px] lg:min-w-[500px] md:h-[170px] lg:h-[241px]  rounded-2xl "
      src={`https://www.youtube.com/embed/${video.key}?&theme=dark&color=white&rel=0`}
    ></iframe>
  );
}
