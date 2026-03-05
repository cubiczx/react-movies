import React from "react";
import MoviePage from "../components/MoviePage";

export default function LatestReleases() {
  return <MoviePage title="Últimos lanzamientos" endpoint="movie/now_playing" />;
}
