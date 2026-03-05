import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuTop from './components/MenuTop';

// Pages
import Home from './pages/home';
import NotFound from './pages/404';
import LatestReleases from './pages/latest-releases';
import Movie from './pages/movie/movie';
import Popular from './pages/popular';
import Search from "./pages/search/search";

export default function App() {

  const { Header, Content } = Layout;

  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1 }}>
          <MenuTop />
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/latest-releases" element={<LatestReleases />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
}