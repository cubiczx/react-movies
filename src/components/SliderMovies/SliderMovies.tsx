import React from "react";
import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";

import './SliderMovies.scss';

export default function SliderMovies(props: any) {
    const {
      movies: { data, loading, error },
    } = props;

    if (loading || !data) {
        return <Loading />;
    }

    if (error) {
        return <Error message="No se han podido cargar las películas." />;
    }

      return (
        <Carousel autoplay className="slider-movies">
          {data.results.map((movie: any) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </Carousel>
      );
}

function Movie(props: any) {
    const { movie: { title, backdrop_path, id, overview } } = props;
    const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

    return (
      <div
        className="slider-movies__movie"
        style={{ backgroundImage: `url('${backdropUrl}')` }}
      >
        <div className="slider-movies__movie-info">
          <div>
            <h2>{title}</h2>
            <p>{overview}</p>
            <Link to={`/movie/${id}`}>
              <Button type="primary">Ver Detalles</Button>
            </Link>
          </div>
        </div>
      </div>
    );
}