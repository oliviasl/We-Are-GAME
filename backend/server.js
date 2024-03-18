const express = require("express");
require("dotenv").config();

const collegeController = require("./controller/college.controller");
const mentorController = require("./controller/mentor.controller");
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
app.post("/api/collegeByName", (req, res) => {
  const {college_name} = req.body;
  collegeController
    .collegeByName(college_name)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// collegeById
// returns data of college by collegeId

app.post("/api/collegeById", (req, res) => {
  const {collegeId} = req.body;
  collegeController
    .collegeById(collegeId)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// collegeHasStuAthAcademicRes
// returns data of colleges with non null stu_ath_academic_res_web_addr
app.get("/api/collegeHasStuAthAcademicRes", (req, res) => {
  collegeController
    .collegeHasStuAthAcademicRes()
    .then((data) =>
      res.status(200).json(data)
    );
});


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

// collegeByGPA
// returns data of colleges that include GPA within their min/max
app.get("/api/collegeByGPA", (req, res) => {
  const {gpa} = req.body;
  collegeController
    .collegeByGPA(gpa)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// collegeBySATRead
// returns data of colleges that include SAT Reading/Writing score within their min/max
app.get("/api/collegeBySATRead", (req, res) => {
  const {satReadWrite} = req.body;
  collegeController
    .collegeBySATRead(satReadWrite)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// collegeBySATMath
// returns data of colleges that include SAT Math score within their min/max
app.get("/api/collegeBySATMath", (req, res) => {
  const {satMath} = req.body;
  collegeController
    .collegeBySATMath(satMath)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// collegeByACT
// returns data of colleges that include ACT score within their min/max
app.get("/api/collegeByACT", (req, res) => {
  const {act} = req.body;
  collegeController
    .collegeByACT(act)
    .then((data) =>
      res.status(200).json(data)
    );
});

// createCollege
// adds a new college entry with passed in params
app.post("/api/createCollege", (req, res) => {
  const {collegeData} = req.body;

  if (!collegeData["college_name"])
    return res.status(400).json({error: "Must provide college_name field."});

  collegeController
    .createCollege(collegeData)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// editCollege
// edits an existing college entry with passed in params
app.post("/api/editCollege", (req, res) => {
  const {collegeId, newFields} = req.body;
  collegeController.editCollege(newFields, collegeId).then((data) => {
    return res.status(200).json(data);
  })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// deleteCollege
app.delete("/api/deleteCollege", (req, res) => {
  const {collegeId} = req.body;

  collegeController
    .deleteCollege(collegeId)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// createAssignment
app.post("/api/createAssignment", (req, res) => {
  const {userId, collegeId} = req.body;
  collegeController.createAssignment(userId, collegeId).then((data) => {
    return res.status(200).json(data);
  })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// deleteAssignment
app.delete("/api/deleteAssignment", (req, res) => {
  const {userId, collegeId} = req.body;
  collegeController.deleteAssignment(userId, collegeId).then((data) => {
    return res.status(200).json(data);
  })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// fetchFromScorecard
app.get("/api/fetchFromScorecard", (req, res) => {
  const {namePrefix, desiredFields, findExact, page, perPage} = req.body;
  collegeController
    .fetchFromScorecard(namePrefix, desiredFields, findExact, page, perPage)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// collegesFiltered
app.post("/api/collegesFiltered", (req, res) => {
  const {fields} = req.body;
  collegeController
    .collegesFiltered(fields)
    .then((data) =>
      res.status(200).json(data)
    );
});

// paginatedCollegesFilterd
app.post("/api/paginatedCollegesFiltered", (req, res) => {
  const { fields, pageNumber } = req.body;
  collegeController
      .paginatedCollegesFiltered(fields, pageNumber)
      .then((data)=>
          res.status(200).json(data)
      );
});

// *** USER API CALLS ***

// allUsers
app.get("/api/allUsers", (req, res) => {
  userController
    .allUsers()
    .then((data) =>
      res.status(200).json(data)
    );
});

// paginatedApprovedUsers
app.post("/api/paginatedApprovedUsers", (req, res) => {
  const {pageNumber} = req.body;

  userController
    .paginatedApprovedUsers(pageNumber)
    .then((data) =>
      res.status(200).json(data)
    );
});

// userById
app.post("/api/userById", (req, res) => {
  const {userId} = req.body;
  userController
    .userById(userId)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});


// userByName
app.post("/api/userByName", (req, res) => {
  const {userName} = req.body;
  userController
    .userByName(userName)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// userBySport
app.get("/api/userBySport", (req, res) => {
  const {sport} = req.body;
  userController
    .userBySport(sport)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// userByEmail
app.post("/api/userByEmail", (req, res) => {
  const {user_email} = req.body;

  userController
    .userByEmail(user_email)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// userByMajor
app.get("/api/userByMajor", (req, res) => {
  const {major} = req.body;
  userController
    .userByMajor(major)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// createUser
app.post("/api/createUser", (req, res) => {
  const {userData} = req.body;
  userController.createUser(userData).then((data) => {
    return res.status(200).json(data);
  });
});

// editUser
app.put("/api/editUser", (req, res) => {
  const {userId, newFields} = req.body;
  userController.editUser(newFields, userId).then((data) => {
    return res.status(200).json(data);
  })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });

});

// deleteUser
app.delete("/api/deleteUser", (req, res) => {
  const {userId} = req.body;
  userController
    .deleteUser(userId)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// unapprovedUsers
app.get("/api/unapprovedUsers", (req, res) => {
  userController
    .unapprovedUsers()
    .then((data) =>
      res.status(200).json(data)
    );
});

// paginatedUnapprovedUsers
app.post("/api/paginatedUnapprovedUsers", (req, res) => {
  const {pageNumber} = req.body;

  userController
    .paginatedUnapprovedUsers(pageNumber)
    .then((data) =>
      res.status(200).json(data)
    );
});

// approveUser
app.put("/api/approveUser", (req, res) => {
  const {userId} = req.body;
  userController
    .approveUser(userId)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// validateUser
app.post("/api/validateUser", (req, res) => {
  const {email, password} = req.body;

  userController
    .validateUser(email, password)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
})

// assignmentsByUserId
app.post("/api/assignmentsByUserId", (req, res) => {
  const {userId} = req.body;
  userController
    .assignmentsByUserId(userId)
    .then((data) =>
      res.status(200).json(data)
    )
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// usersFiltered
app.post("/api/usersFiltered", (req, res) => {
  const {fields} = req.body;
  userController
    .usersFiltered(fields)
    .then((data) =>
      res.status(200).json(data)
    );
});

// paginatedUsersFiltered
app.post("/api/paginatedUsersFiltered", (req, res) => {
  const {fields, pageNumber} = req.body;

  userController
    .paginatedUsersFiltered(fields, pageNumber)
    .then((data) =>
      res.status(200).json(data)
    );
});




// *** MENTOR API CALLS ***

// allMentors
app.get("/api/allMentors", async (req, res) => {
  mentorController
    .allMentors()
    .then(mentors => res.status(200).json(mentors))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// mentorById
app.post("/api/mentorById", async (req, res) => {
  const {mentorId} = req.body;

  mentorController
    .mentorById(mentorId)
    .then(data => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// mentorByName
app.post("/api/mentorByName", async (req, res) => {
  const {mentorName} = req.body;

  mentorController
    .mentorByName(mentorName)
    .then(data => res.status(200).json(data))
    .catch(error => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// mentorByMajor
app.post("/api/mentorByMajor", async (req, res) => {
  const {major} = req.body;

  mentorController
    .mentorByMajor(major)
    .then(data => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// mentorBySport
app.post("/api/mentorBySport", async (req, res) => {
  const {sport} = req.body;

  mentorController
    .mentorBySport(sport)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// createMentor
app.post("/api/createMentor", (req, res) => {
  const {mentorData} = req.body;

  if (!mentorData["mentor_firstname"])
    return res.status(400).json({error: "Must provide mentor_firstname field."});
  if (!mentorData["mentor_lastname"])
    return res.status(400).json({error: "Must provide mentor_lastname field."});

  mentorController
    .createMentor(mentorData)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// editMentor
app.post("/api/editMentor", (req, res) => {
  const {mentorId, newFields} = req.body;

  console.log("mentorId: " + mentorId);
  console.log("newFields: " + newFields);

  mentorController
    .editMentor(newFields, mentorId)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// deleteMentor
app.delete("/api/deleteMentor", (req, res) => {
  const {mentorId} = req.body;

  mentorController
    .deleteMentor(mentorId)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({error});
    });
});

// Start Backend Port
app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});

