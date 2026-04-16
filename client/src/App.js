import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#13131f' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prompt/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;