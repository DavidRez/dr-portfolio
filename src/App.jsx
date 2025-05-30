import { Routes, Route, useLocation } from 'react-router';
import { Home } from './pages';
import Work from './pages/Work/Work';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import { useGlobal } from './context/GlobalContext';
import './App.css';
import Spinner from './components/ui/Spinner/Spinner';

function App() {
  const { loading } = useGlobal();
  const location = useLocation();
  const currentRoute = location.pathname;

  if (!loading) {
    return (
      <main className={currentRoute.includes('work') ? 'pages-work' : null}>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/work' element={<Work />} />
        </Routes>
        <Footer />
      </main>
    )
  } else {
    return (
      <main>
        <Spinner />
      </main>
    )
  }
}

export default App
