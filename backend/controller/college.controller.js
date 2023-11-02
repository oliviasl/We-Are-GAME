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

    async editCollege(newFields, college_id) {
        const query =
            "UPDATE colleges SET " +
            Object.keys(newFields)
            .map((column) => column + "='" + newFields[column] + "'")
            .join(", ") +
            " WHERE college_id=" +
            college_id +
            " RETURNING *;";
        try {
            const result = await db.query(query, []);
            return result.rows;
        } catch (error) {
            return error;
        }
    }

}

module.exports = new collegeController();