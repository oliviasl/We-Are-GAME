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

    async editCollege(newFields, college_id) {
        try {
            const query =
                "UPDATE colleges SET " +
                Object.keys(newFields)
                .map((column) => column + "='" + newFields[column] + "'")
                .join(", ") +
                " WHERE college_id=" +
                college_id +
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

    async collegeBySATMath(sat_math) {
        const result = await db.query(
            "SELECT * FROM colleges WHERE $1 BETWEEN min_sat_math AND max_sat_math;",
            [sat_math]
        );
        return result.rows;
    }

}

module.exports = new collegeController();