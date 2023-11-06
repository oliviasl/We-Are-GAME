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

    async collegeByName(name){
        try {
            const result = await db.query(
                "SELECT * FROM colleges WHERE name = $1;",
                [name]
            );
            return result.rows;
        }
        catch(error){
            return error;
        }
    }

    async collegeHasAcademicResource() {
        try {
            const result = await db.query(
                "SELECT * FROM colleges WHERE academic_resources_web_addr IS NOT NULL",
                []
            );
            return result.rows;
        } catch (error) {
            return error;
        }
    }

    async collegeHasDiversityResource() {
        try {
            const result = await db.query(
                "SELECT * FROM colleges WHERE diversity_resources_web_addr IS NOT NULL",
                []
            );
            return result.rows;
        } catch (error) {
            return error;
        }
    }

}

module.exports = new collegeController();