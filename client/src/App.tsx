
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import AddCollege from "./routes/AddCollege";
import HomePage from "./routes/HomePage";
import StudentProfile from "./routes/StudentProfile";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-college" element={<AddCollege />} />
          <Route path="/student-profile" element={<StudentProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
