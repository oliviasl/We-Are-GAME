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
                "SELECT * FROM colleges WHERE min_act <= "+act+" AND max_act >= "+act+";",
                []
            );
            return result.rows;
        } catch (error) {
            return error;
        }
    }


}

module.exports = new collegeController();