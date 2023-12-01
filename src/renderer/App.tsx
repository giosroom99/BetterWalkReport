import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Better from './BetterWalkReport';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Better />} />
      </Routes>
    </Router>
  );
}
