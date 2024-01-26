
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import AddCollege from "./routes/AddCollege";
import HomePage from "./routes/HomePage";
import CollegeDatabase from "./routes/CollegeDatabase";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-college" element={<AddCollege />} />
            <Route path="/college-database" element={<CollegeDatabase />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
