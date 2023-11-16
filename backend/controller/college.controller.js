require("dotenv").config();
const db = require("../db");


class collegeController {

    async allColleges() {
        try {
            const result = await db.query(
                "SELECT * FROM colleges;",
                []
            );
            return result.rows;
        } catch (error) {
            return error;
        }
    }

    async collegeByACT(act) {
        try {
            const result = await db.query(
                "SELECT * FROM colleges WHERE $1 BETWEEN min_act AND max_act;",
                [act]
            );
             return result.rows;
        } catch (error) {
            return error;
        }
    }

    async editCollege(newFields, collegeId) {
        try {
            const query =
                "UPDATE colleges SET " +
                Object.keys(newFields)
                .map((column) => column + "='" + newFields[column] + "'")
                .join(", ") +
                " WHERE college_id=" +
                collegeId +
                " RETURNING *;";
            const result = await db.query(query, []);
            return result.rows;
        } catch (error) {
            return error;
        }
    }

    async collegesByGPA(gpa) {
        const result = await db.query(
            "SELECT * FROM colleges WHERE $1 BETWEEN min_gpa AND max_gpa;",
            [gpa]
        );
        return result.rows;
    }

    async collegeBySATRead(satReadWrite) {
        const result = await db.query(
            "SELECT * FROM colleges WHERE $1 BETWEEN min_sat_read_write AND max_sat_read_write;",
            [satReadWrite]
          );
        return result.rows;
    }

    async collegeBySATMath(satMath) {
        const result = await db.query(
            "SELECT * FROM colleges WHERE $1 BETWEEN min_sat_math AND max_sat_math;",
            [satMath]
        );
        return result.rows;
    }
  
    async createCollege(collegeData) {
        const insertKeys = Object.keys(collegeData);
        const insertValues = Object.values(collegeData);
      
        // create placeholder values ($1, $2, etc.) for each value to be inserted
        const placeholders = insertKeys
            .map((_, index) => `$${index + 1}`)
            .join(", ");

        const insertQuery = `
                INSERT INTO colleges (${insertKeys.join(", ")})
                VALUES (${placeholders})
                RETURNING college_id;
            `;

        const result = await db.query(insertQuery, insertValues);

        return result.rows[0];
    }
}

module.exports = new collegeController();