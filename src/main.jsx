import { BrowserRouter, Routes, Route } from 'react-router-dom';


import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import SpotifyPage from './components/SpotifyPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/spotify" element={<SpotifyPage />} />
    </Routes>
  </BrowserRouter>
);
