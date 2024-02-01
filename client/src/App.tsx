import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import AddCollege from "./routes/AddCollege";
import HomePage from "./routes/HomePage";
import CollegeDatabase from "./routes/CollegeDatabase";
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
            <Route path="/college-database" element={<CollegeDatabase/>}/>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
