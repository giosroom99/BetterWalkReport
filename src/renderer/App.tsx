import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Better from './BetterWalkReport';

function Main() {
  return (
    <div className="">
      <div className="row  py-4">
        <h2 className="text-center fw-bold">Better Walk Report</h2>
        <Better />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
