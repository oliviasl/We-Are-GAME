require("dotenv").config();
const db = require("../db");


class mentorController {

  // allMentors
  async allMentors(directCall = true) {
    const queryStr = "SELECT * FROM mentors";
    if (directCall) {
      try {
        const result = await db.query(queryStr + ";", []);
        return result.rows;
      } catch (error) {
        return error;
      }
    } else {
      return [queryStr];
    }
  }

  // mentorById
  async mentorById(mentorId, directCall = true) {
    const queryStr = "SELECT * FROM mentors WHERE mentor_id = $1";
    if (directCall) {
      try {
        const result = await db.query(queryStr, [mentorId]);
        return result.rows;
      } catch (error) {
        throw error;
      }
    } else {
      return [queryStr, [mentorId]];
    }
  }

  // mentorByName
  async mentorByName(mentorName, directCall = true) {
    try {
      let result = null;
      if (!mentorName.includes(" ")) {
        // If there is no space in mentorName, check for matches with first and last name
        const queryStr = "SELECT * FROM mentors WHERE LOWER(mentor_firstname) LIKE LOWER($1) OR LOWER(mentor_lastname) LIKE LOWER($1)";
        if (directCall) {
          result = await db.query(
            queryStr + ";",
            [mentorName]
          );
        } else {
          return [queryStr, [mentorName]];
        }
      } else {
        // If there is a space in mentorName, check for matches with first and last name
        const queryStr = "SELECT * FROM mentors WHERE LOWER(mentor_firstname) LIKE LOWER($1) AND LOWER(mentor_lastname) LIKE LOWER($2)";
        const names = mentorName.split(" ");
        if (directCall) {
          result = await db.query(
            queryStr + ";",
            [names[0], names[1]]
          );
        } else {
          return [queryStr, [names[0], names[1]]];
        }
      }
      return result.rows;
    } catch (error) {
      return error;
    }
  }

  // mentorByMajor
  async mentorByMajor(major, directCall = true) {
    const queryStr = `
        SELECT *
        FROM mentors
        WHERE mentor_major_1 = $1
           OR mentor_major_2 = $1
           OR mentor_major_3 = $1`;

    if (directCall) {
      try {
        const result = await db.query(queryStr, [major]);
        return result.rows;
      } catch (error) {
        throw error;
      }
    } else {
      return [queryStr, [major]];
    }
  }

  // mentorBySport
  async mentorBySport(sport, directCall = true) {
    const queryStr = `
        SELECT *
        FROM mentors
        WHERE mentor_sport1 = $1
           OR mentor_sport2 = $1`;

    if (directCall) {
      try {
        const result = await db.query(queryStr, [sport]);
        return result.rows;
      } catch (error) {
        throw error;
      }
    } else {
      return [queryStr, [sport]];
    }
  }


  // createMentor

  // editMentor

  // deleteMentor

}

module.exports = new mentorController();