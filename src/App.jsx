import { Routes, Route } from 'react-router';
import { Home } from './pages';
import Work from './pages/Work/Work';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
// import GlobalProvider from './context/GlobalProvider';
import { useGlobal } from '@/context/GlobalContext';
import './App.css';
import Spinner from './components/ui/Spinner/Spinner';

function App() {
  const { loading } = useGlobal();
  
  if (!loading) {
    return (
      <main>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/work' element={<Work />} />
        </Routes>
        <Footer />
      </main>
    )
      {/* <h1 className="text-3xl font-bold underline">App</h1> */} 
  } else {
    return (
      <main>
        <Spinner />
      </main>
    )
  }
}

export default App
