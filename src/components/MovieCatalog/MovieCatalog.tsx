import React from "react";
import { Row, Col, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./MovieCatalog.scss";

export default function MovieCatalog(props: any) {
  const { movies } = props;

  return (
    <div className="catalog-container">
      <Row gutter={[16, 16]}>
        {movies.map((movie: any) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6} xl={4} className="movie-catalog">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function MovieCard(props: any) {
    const { movie: { title, poster_path, id } } = props;
    const { Meta } = Card;
    const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;

    return (
      <Link to={`/movie/${id}`}>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={<img alt={title} src={posterUrl} style={{ height: 360, objectFit: 'cover' }} />}
          actions={[<EyeOutlined key="view" />]}
        >
          <Meta title={title} />
        </Card>
      </Link>
    );
}