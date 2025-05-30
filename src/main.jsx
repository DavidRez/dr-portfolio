import { StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router';
import './globals.css';
import './styles/typography.css';
import App from './App.jsx';
import GlobalProvider from './context/GlobalProvider';

const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <Wrapper>
          <App />
        </Wrapper>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
)
