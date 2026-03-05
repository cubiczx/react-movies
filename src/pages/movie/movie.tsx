import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { PlayCircleOutlined } from "@ant-design/icons";
import useFetch from "../../hooks/useFetch";
import { API_KEY, API_URL, LANG } from "../../utils/constants";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";
import "./movie.scss";

export default function Movie() {
  const { id } = useParams();
  const movieDetails = useFetch(
    `${API_URL}/movie/${id}?language=${LANG}&append_to_response=videos&api_key=${API_KEY}`,
  );

  const { data, loading, error } = movieDetails;

  if (loading || !data) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error message="No se han podido cargar los detalles de la película." />
    );
  }

  return <RenderMovieDetails movie={data} />;
}

function RenderMovieDetails(props: any) {
  const {
    movie: { backdrop_path, poster_path },
  } = props;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row className="movie-details">
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie posterPath={poster_path} />
        </Col>
        <Col span={10} className="movie__info">
          <InfoMovie movie={props.movie} />
        </Col>
      </Row>
    </div>
  );
}

function PosterMovie(props: any) {
  const { posterPath } = props;
  const posterUrl = `https://image.tmdb.org/t/p/original${posterPath}`;

  return <div style={{ backgroundImage: `url('${posterUrl}')` }} />;
}

function InfoMovie(props: any) {
  const {
    movie: { title, releaseDate, overview, genres, videos },
  } = props;
  const formattedDate = dayjs(releaseDate).format("YYYY");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const renderVideo = () => {
    if (videos?.results?.length > 0) {
        const trailer = videos.results.find(
          (video: any) => video.type === "Trailer",
        );
        if (trailer) {
          return (
            <>
              <Button onClick={openModal} icon={<PlayCircleOutlined />}>
                Ver Trailer
              </Button>
              <ModalVideo
                videoKey={trailer.key}
                videoPlatform={trailer.site}
                open={isOpenModal}
                onClose={closeModal}
              />
            </>
          );
        }
    }
  };

  return (
    <>
      <div className="movie__info-header">
        <h1>
          {title}
          <span>{formattedDate}</span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <h3>Información</h3>
        <p className="movie__info-content-overview">{overview}</p>
        <h3>Géneros</h3>
        <ul>
          {genres.map((genre: any) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
