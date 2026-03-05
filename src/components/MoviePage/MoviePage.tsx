import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { API_KEY, API_URL, LANG } from "../../utils/constants";
import Footer from "../Footer";
import Loading from "../Loading";
import MovieCatalog from "../MovieCatalog";
import PaginationMovies from "../Pagination";

interface MoviePageProps {
  title: string;
  endpoint: string;
}

export default function MoviePage({ title, endpoint }: MoviePageProps) {
  const [movieList, setMovieList] = useState({ results: [], page: 1, total_results: 0 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/${endpoint}?language=${LANG}&page=${page}&api_key=${API_KEY}`,
        );
        const data = await response.json();
        setMovieList(data);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    })();
  }, [page, endpoint]);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Row>
      <Col span={24} style={{ textAlign: "center", marginTop: 25 }}>
        <h1 style={{ fontSize: 35, fontWeight: "bold" }}>{title}</h1>
      </Col>
      {movieList.results && movieList.results.length > 0 ? (
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <MovieCatalog movies={movieList.results} />
          </Col>
          <Col span={24}>
            <PaginationMovies
              current={movieList.page}
              total={movieList.total_results}
              pageSize={movieList.results.length}
              onChange={onPageChange}
            />
          </Col>
        </Row>
      ) : (
        <Col span={24}>
          <Loading />
        </Col>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}
