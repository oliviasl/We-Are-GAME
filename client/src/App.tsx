import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import AddCollege from "./routes/AddCollege";
import HomePage from "./routes/HomePage";
import AuthenticateUsers from "./routes/AuthenticateUsers";
import CollegeDatabase from "./routes/CollegeDatabase";
import StudentDatabase from "./routes/StudentDatabase";
import StudentProfileRoute from "./routes/StudentProfile";
import PeerProfileViewRoute from "./routes/PeerProfileView";
import EditStudent from "./routes/EditStudent";
import CollegeProfile from "./routes/CollegeProfile";
import EditCollege from "./routes/EditCollege";
import {ThemeProvider} from "@material-tailwind/react";
import theme from "./util/theme";
import {Navbar} from "./layouts/Navbar";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <ThemeProvider value={theme}>
      <div>
        <Navbar/>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/add-college" element={<AddCollege/>}/>
            <Route path="/edit-college">
              <Route path=":id" element={<EditCollege/>}/>
            </Route>
            <Route path="/authenticate" element={<AuthenticateUsers/>}/>
            <Route path="/college-database" element={<CollegeDatabase/>}/>
            <Route path="/student-profile">
              <Route path=":id" element={<StudentProfileRoute/>}/>
            </Route>
            <Route path="/edit-student" element={<EditStudent/>} />
            <Route path="/peer-profile" element={<PeerProfileViewRoute/>}/>
            <Route path="/college-profile">
              <Route path=":id" element={<CollegeProfile/>}/>
            </Route>
            <Route path="/student-database" element={<StudentDatabase/>}/>
          </Routes>
        </Router>
      </div>
      <ToastContainer hideProgressBar={true} position={"bottom-right"}/>
    </ThemeProvider>
  );
}

export default App;
