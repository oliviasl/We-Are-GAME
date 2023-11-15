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


// collegesByGPA
// returns data of colleges that include GPA within their min/max
app.get("/api/collegesByGPA", (req, res) => {
  const { gpa } = req.body;
  collegeController
    .collegesByGPA(gpa)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

// collegeBySATRead
// returns data of colleges that include SAT Reading/Writing score within their min/max
app.get("/api/collegeBySATRead", (req, res) => {
  const { satReadWrite } = req.body;
  collegeController
    .collegeBySATRead(satReadWrite)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

// collegeBySATMath
// returns data of colleges that include SAT Math score within their min/max

// collegeByACT
// returns data of colleges that include ACT score within their min/max
app.get("/api/collegeByACT", (req, res) => {
  const { act } = req.body;
  collegeController
    .collegeByACT(act)
    .then((data)=>
      res.status(200).json(data)
    );
});

// createCollege
// adds a new college entry with passed in params


// editCollege
// edits an existing college entry with passed in params
app.put("/api/editCollege", (req, res) => {
  const { collegeId, newFields } = req.body;
  collegeController.editCollege(newFields, collegeId).then((data) => {
    return res.status(200).json(data);
  });
});

// Start Backend Port 
app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
