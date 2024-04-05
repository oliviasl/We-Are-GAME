import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import theme from "./util/theme";
import AddCollege from "./routes/AddCollege";
import HomePage from "./routes/HomePage";
import AuthenticateUsers from "./routes/AuthenticateUsers";
import CollegeDatabase from "./routes/CollegeDatabase";
import StudentDatabase from "./routes/StudentDatabase";
import StudentProfileRoute from "./routes/StudentProfile";
// import MentorProfileViewRoute from "./routes/MentorProfile";
import EditStudent from "./routes/EditStudent";
import CollegeProfile from "./routes/CollegeProfile";
import EditCollege from "./routes/EditCollege";
import MentorDatabase from "./routes/MentorDatabase";
import EditMentor from "./routes/EditMentor";
import AddMentor from "./routes/AddMentor";
import AuthGuard from "./routes/AuthGuard";
import NotFoundPage from "./routes/NotFoundPage";
import Background from "./layouts/Background";
import MobilePopup from "./layouts/MobilePopup";
import { ThemeProvider } from "@material-tailwind/react";
import { Navbar } from "./layouts/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider value={theme}>
      <MobilePopup/>
      <div>
        <Navbar />
        <Router>
          <Background/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route element={<AuthGuard/>}>
              <Route path="/authenticate" element={<AuthenticateUsers/>}/>
              <Route path="/add-college" element={<AddCollege/>}/>
              <Route path="/edit-college">
                <Route path=":id" element={<EditCollege/>}/>
              </Route>
              <Route path="/college-database" element={<CollegeDatabase/>}/>
              <Route path="/mentor-database" element={<MentorDatabase/>}/>
              <Route path="/student-profile">
                <Route path=":id" element={<StudentProfileRoute/>}/>
              </Route>
              <Route path="/edit-student">
                <Route path=":id" element={<EditStudent />} />
              </Route>
              <Route path="/college-profile">
                <Route path=":id" element={<CollegeProfile />} />
              </Route>
              <Route path="/student-database" element={<StudentDatabase />} />
              <Route path="/edit-mentor">
                <Route path=":id" element={<EditMentor />} />
              </Route>
              <Route path="/add-mentor" element={<AddMentor />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer hideProgressBar={true} position={"bottom-right"} />
    </ThemeProvider>
  );
}

export default App;
