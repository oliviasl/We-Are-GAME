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
        WHERE LOWER(mentor_major1) LIKE LOWER($1)
           OR LOWER(mentor_major2) LIKE LOWER($1)
           OR LOWER(mentor_major3) LIKE LOWER($1)`;

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
        WHERE LOWER(mentor_sport1) LIKE LOWER($1)
           OR LOWER(mentor_sport2) LIKE LOWER($1)`;

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
  async createMentor(mentorData) {
      const insertKeys = Object.keys(mentorData);
      const insertValues = Object.values(mentorData);

      // create placeholder values ($1, $2, etc.) for each value to be inserted
      const placeholders = insertKeys
          .map((_, index) => `$${index + 1}`)
          .join(", ");

      const insertQuery = `
              INSERT INTO mentors (${insertKeys.join(", ")})
              VALUES (${placeholders})
              RETURNING mentor_id;
          `;

      const result = await db.query(insertQuery, insertValues);

      return result.rows[0];
  }

  // editMentor
  async editMentor(newFields, mentorId) {        
      try {
          const query =
              "UPDATE mentors SET " +
              Object.keys(newFields)
              .map((column) => column + "='" + newFields[column] + "'")
              .join(", ") +
              " WHERE mentor_id=" +
              mentorId +
              " RETURNING *;";
          const result = await db.query(query, []);
          return result.rows;
      } catch (error) {
          return error;
      }
  }

  // deleteMentor
  async deleteMentor(mentorId) {
      // delete mentor
      const result = await db.query(`DELETE FROM mentors WHERE mentor_id = $1`, [mentorId]);
      return result.rows;
  }

  sqlBuilder(fields, pageNumber) {
      let query="SELECT * FROM mentors";
      let wheres=[];

      if("mentorByName" in fields && fields["mentorByName"]!=null && fields["mentorByName"]!=""){
        wheres.push("(LOWER(CONCAT('%', mentor_firstname, '%')) LIKE LOWER('%"+fields["mentorByName"]+"%') OR LOWER(CONCAT('%', mentor_lastname, '%')) LIKE LOWER('%"+fields["mentorByName"]+"%') OR LOWER(CONCAT(mentor_firstname, ' ', mentor_lastname)) LIKE LOWER('%"+fields["mentorByName"]+"%'))");
    }
      if("mentorBySport" in fields && fields["mentorBySport"]!=null && fields["mentorBySport"]!=""){
          wheres.push("(LOWER(CONCAT('%', mentor_sport1, '%')) LIKE LOWER('%"+fields["mentorBySport"]+"%') OR LOWER(CONCAT('%', mentor_sport2, '%')) LIKE LOWER('%"+fields["mentorBySport"]+"%'))");
      }
      if("mentorByMajor" in fields && fields["mentorByMajor"]!=null && fields["mentorByMajor"]!=""){
          wheres.push("(LOWER(CONCAT('%', mentor_major1, '%')) LIKE LOWER('%"+fields["mentorByMajor"]+"%') OR LOWER(CONCAT('%', mentor_major2, '%')) LIKE LOWER('%"+fields["mentorByMajor"]+"%') OR LOWER(CONCAT('%', mentor_major3, '%')) LIKE LOWER('%"+fields["mentorByMajor"]+"%'))");
      }

      const sqlWhere=wheres.join(" AND ");

      const PAGE_SIZE = 6;
      const offset = (pageNumber - 1) * PAGE_SIZE;
      const sqlStr = " ORDER BY mentor_firstname LIMIT "+PAGE_SIZE+" OFFSET "+offset+";";

      if(wheres.length!=0){
          return [query+" WHERE "+sqlWhere+";", query+" WHERE "+sqlWhere+sqlStr];
      }
      return [query+";", query+sqlStr];
  }

  async paginatedMentorsFiltered(fields, pageNumber){

      // page size is 6
      const PAGE_SIZE = 6;
      // Make one not paginated to calculate total pages
      const [filteredMentorQuery, filteredPaginatedMentorQuery] = this.sqlBuilder(fields, pageNumber);

      const filteredPaginatedMentorResult = await db.query(filteredPaginatedMentorQuery);
      const filteredMentorResult = await db.query(filteredMentorQuery);

      const totalCount = filteredMentorResult.rows.length;
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);

      return {mentorData: filteredPaginatedMentorResult.rows, pageNumber: pageNumber, totalPages: totalPages};
  }

}

module.exports = new mentorController();