import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import AddCollege from "./routes/AddCollege";
import HomePage from "./routes/HomePage";
import AuthenticateUsers from "./routes/AuthenticateUsers";
import CollegeDatabase from "./routes/CollegeDatabase";
import StudentProfileRoute from "./routes/StudentProfile";
import {ThemeProvider} from "@material-tailwind/react";
import theme from "./util/theme";
import CollegeProfile from "./routes/CollegeProfile";

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
            <Route path="/student-profile" element={<StudentProfileRoute/>}/>
            <Route path="/college-profile">
              <Route path=":id" element={<CollegeProfile/>}/>
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
