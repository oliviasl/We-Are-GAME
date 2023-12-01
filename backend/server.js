const express = require("express");
require("dotenv").config();

const collegeController = require("./controller/college.controller");
const userController = require("./controller/user.controller");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// *** COLLEGE API CALLS ***

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
app.get("/api/collegeByName", (req, res) => {
  const { college_name } = req.body;
  collegeController
    .collegeByName(college_name)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

// collegeById
// returns data of college by collegeId

app.get("/api/collegeById", (req, res) => {
  const { collegeId } = req.body;
  collegeController
    .collegeById(collegeId)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

// collegeHasStuAthAcademicRes
// returns data of colleges with non null stu_ath_academic_res_web_addr


// collegeHasAcademicResources
// returns data of colleges with non null academic_resources_web_addr
app.get("/api/collegeHasAcademicResource", (req, res) => {
  collegeController
    .collegeHasAcademicResource()
    .then((data) =>
      res.status(200).json(data)
    );
});

// collegeByDiversityResources
// returns data of colleges with non null diversity_resources_web_addr
app.get("/api/collegeHasDiversityResource", (req, res) => {
  collegeController
    .collegeHasDiversityResource()
    .then((data) =>
      res.status(200).json(data)
    );
});

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
app.get("/api/collegeBySATMath", (req, res) => {
  const { satMath } = req.body;
  collegeController
    .collegeBySATMath(satMath)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

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
app.put("/api/editCollege", (req, res) => {
  const { collegeId, newFields } = req.body;
  collegeController.editCollege(newFields, collegeId).then((data) => {
    return res.status(200).json(data);
  });
});

// deleteCollege

// autofill college api

// assignmentByUserId

// createAssignment

// deleteAssignment


// *** USER API CALLS ***

// userById
app.get("/api/userById", (req, res) => {
  const { userId } = req.body;
  userController
    .userById(userId)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

// userByName

// userBySport
app.get("/api/userBySport", (req, res) => {
  const { sport } = req.body;
  userController
    .userBySport(sport)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

// userByMajor

// createUser

// editUser
app.put("/api/editUser", (req, res) => {
  const { userId, newFields } = req.body;
  userController.editUser(newFields, userId).then((data) => {
    return res.status(200).json(data);
  })
  .catch((error) => {
    console.error(error);
    return res.status(500).json({ error });
  });

});

// deleteUser

// unapprovedUsers
app.get("/api/unapprovedUsers", (req, res) => {
  userController
    .unapprovedUsers()
    .then((data)=>
      res.status(200).json(data)
    );
});

// approveUser
app.put("/api/approveUser", (req, res) => {
  const { userId } = req.body;
  userController
    .approveUser(userId)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
});

// validateUser
app.get("/api/validateUser", (req, res) => {
  const { email, password } = req.body;

  userController
    .validateUser(email, password)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error });
    });
})


// *** MENTOR API CALLS ***

// mentorById

// createMentor

// editMentor

// deleteMentor


// Start Backend Port
app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
