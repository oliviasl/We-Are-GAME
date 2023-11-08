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