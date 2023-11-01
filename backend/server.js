const express = require("express");
require("dotenv").config();

const collegeController = require("./controller/college.controller");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/getCollegeData", (req, res) => {
  collegeController
    .getCollegeTable()
    .then((data) =>
      res.status(200).json(data)
    );
});

// Start Backend Port 
app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
