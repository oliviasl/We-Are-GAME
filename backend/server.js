const express = require("express");
require("dotenv").config();

const collegeController = require("./controller/college.controller");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// returns data of all colleges
app.get("/api/allColleges", (req, res) => {
  collegeController
    .allColleges()
    .then((data) =>
      res.status(200).json(data)
    );
});

// collegeByName
// returns data of colleges by name


// collegeByAcademicResources
// returns data of colleges with non null academic_resources_web_addr


// collegeByDiversityResources
// returns data of colleges with non null diversity_resources_web_addr


// collegeByGPA
// returns data of colleges that include GPA within their min/max


// collegeBySATRead
// returns data of colleges that include SAT Reading/Writing score within their min/max


// collegeBySATMath
// returns data of colleges that include SAT Math score within their min/max


// collegeByACT
// returns data of colleges that include ACT score within their min/max


// createCollege
// adds a new college entry with passed in params
app.post("/api/createCollege", (req, res) => {
  const { collegeData } = req.body;

  if (!collegeData["college_name"])
    return res.status(400).json({ error: "Must provide college_name field." });

  collegeController
    .createCollege(collegeData)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

// editCollege
// edits an existing college entry with passed in params


// Start Backend Port
app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
});
