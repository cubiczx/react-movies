import React from "react";
import { List, Button, Avatar } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";

import './MovieList.scss';

export default function MovieList(props: any) {
    const {
      movies: { data, loading, error },
        title,
    } = props;

    if (loading || !data) {
        return <Loading />;
    }

    if (error) {
        return <Error message="No se han podido cargar las películas." />;
    }

      return (
        <List
          className="movie-list"
          size="default"
          //itemLayout="horizontal"
          dataSource={data.results}
          header={<h2>{title}</h2>}
          bordered
          renderItem={(movie: any) => (
            <RenderMovie key={movie.id} movie={movie} />
          )}
        />
      );
}

function RenderMovie(props: any) {
    const { movie: { title, poster_path, id } } = props;
    const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;

    return (
      <List.Item
        className="movie-list__movie"
      >
        <List.Item.Meta
          avatar={<Avatar shape="square" size={64} src={posterUrl} />}
          title={<Link to={`/movie/${id}`}>{title}</Link>}
        />
        <Link to={`/movie/${id}`}>
          <Button type="primary" shape="square" icon={<RightOutlined />} />
        </Link>
      </List.Item>
    );
}