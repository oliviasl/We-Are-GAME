import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import AddCollege from "./routes/AddCollege";
import HomePage from "./routes/HomePage";
import AuthenticateUsers from "./routes/AuthenticateUsers";
import CollegeDatabase from "./routes/CollegeDatabase";
import StudentDatabase from "./routes/StudentDatabase";
import StudentProfileRoute from "./routes/StudentProfile";
import {ThemeProvider} from "@material-tailwind/react";
import theme from "./util/theme";

function App() {
  return (
    <ThemeProvider value={theme}>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/add-college" element={<AddCollege/>}/>
            <Route path="/authenticate" element={<AuthenticateUsers/>}/>
            <Route path="/college-database" element={<CollegeDatabase/>}/>
            <Route path="/student-database" element={<StudentDatabase/>}/>
            <Route path="/student-profile" element={<StudentProfileRoute />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
