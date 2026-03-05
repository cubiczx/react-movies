import React from "react";
import MoviePage from "../components/MoviePage";

export default function Popular() {
  return <MoviePage title="Películas Populares" endpoint="movie/popular" />;
}
