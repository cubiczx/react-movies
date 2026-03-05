import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Input } from 'antd';
import { useSearchParams } from 'react-router-dom';
import MovieCatalog from '../../components/MovieCatalog/MovieCatalog';
import Footer from '../../components/Footer';
import { API_KEY, API_URL, LANG } from '../../utils/constants';

import './search.scss';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState(query);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchParams({ q: value });
    }, 300);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `${API_URL}/search/movie?query=${query}&language=${LANG}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [query]);

  return (
    <Row>
      <Row justify="center" className="search-input-row">
        <Col span={12} className="search-input">
          <h1>Busca películas</h1>
          <Input className="search-input__field"
          placeholder="Buscar películas"
          value={searchTerm}
          onChange={handleChange}
          onPressEnter={() => setSearchParams({ q: searchTerm })}
        />
        </Col>
      </Row>
      {movies.length > 0 && (
        <Row>
          <Col span={24}>
            <MovieCatalog movies={movies} />
          </Col>
        </Row>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}