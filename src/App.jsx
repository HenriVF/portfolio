import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

// Página provisória: será substituída pela Home real na branch feature/github-api.
function Home() {
  return (
    <section className="hero">
      <h1 className="hero__title">Portfólio em construção.</h1>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
