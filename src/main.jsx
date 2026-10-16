import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LibraryProvider } from './context/LibraryContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <LibraryProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </LibraryProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
);
