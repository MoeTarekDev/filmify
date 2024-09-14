export type optionsType = {
  url: string;
  method: string;
  headers?: {};
  data?: {};
  params?: {
    query?: string;
    page?: string | number;
    include_adult?: boolean;
    language?: string;
    with_genres?: string;
    sort_by?: string;
    include_video?: boolean;
    with_original_language?: string;
  };
};

export const apiToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmM3ZDI1ZjdmODJkOTBlZWZmZGM2MmNjMTYxMWY2NCIsIm5iZiI6MTcyMDkxNzc3OS41NzY4MDIsInN1YiI6IjY2OTIwMTUxMTA0NTgyYzE5MmFkMDliZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LVJjUwIuYk8SjwopfQsJxRD_2TiNb3NMLrw8LWmxYGM";

export type movieType = {
  id?: number;
  backdrop_path?: string;
  poster_path?: string;
  original_title?: string;
  vote_average?: number;
  release_date?: string;
  title?: string;
};

export type fomrikObject = {
  initialValues: {
    userName?: string;
    email: string;
    password?: string | number;
  };
};
