
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import AddCollege from "./routes/AddCollege";
import HomePage from "./routes/HomePage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-college" element={<AddCollege />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
