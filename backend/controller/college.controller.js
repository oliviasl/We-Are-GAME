require("dotenv").config();
const db = require("../db");


class collegeController {

    async getCollegeTable() {
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
}

module.exports = new collegeController();