import React from "react";
import { Row, Col } from "antd";
import useFetch from "../hooks/useFetch";
import SliderMovies from "../components/SliderMovies";
import MovieList from "../components/MovieList/MovieList";
import Footer from "../components/Footer";

import { API_KEY, API_URL, LANG } from "../utils/constants";

export default function Home() {

  const latestReleases = useFetch(
    `${API_URL}/movie/now_playing?language=${LANG}&page=1&api_key=${API_KEY}`,
  );

  const popularMovies = useFetch(
    `${API_URL}/movie/popular?language=${LANG}&page=1&api_key=${API_KEY}`,
  );

  const topRatedMovies = useFetch(
    `${API_URL}/movie/top_rated?language=${LANG}&page=1&api_key=${API_KEY}`,
  );

  return (
    <>
      <SliderMovies movies={latestReleases} />
      <Row style={{ padding: "20px" }}>
        <Col span={12}>
          <MovieList movies={popularMovies} title="Populares" />
        </Col>
        <Col span={12}>
          <MovieList movies={topRatedMovies} title="Mejor Valoradas" />
        </Col>
      </Row>
      <Footer />
    </>
  );
}