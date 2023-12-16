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

    async collegeByName(college_name){
        try {
            const result = await db.query(
                "SELECT * FROM colleges WHERE LOWER(college_name) LIKE LOWER($1);",
                ['%' + college_name + '%']
            );
            return result.rows;
        }
        catch(error){
            return error;
        }
    }
    
    async collegeById(collegeId){
        try {
            const result = await db.query(
                "SELECT * FROM colleges WHERE college_id = $1;",
                [collegeId]
            );
            return result.rows;
        }
        catch(error){
            return error;
        }
      }
    
    async collegeHasStuAthAcademicRes() {
        try {
            const result = await db.query(
                "SELECT * FROM colleges WHERE stu_ath_academic_res_web_addr IS NOT NULL",
                []
            );
            return result.rows;
        } catch (error) {
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

    // deleteCollege
    async deleteCollege(collegeId) {
        // delete assignments tied to college
        await db.query(`DELETE FROM college_assignments WHERE college_id = $1`, [collegeId]);

        // delete college
        const result = await db.query(`DELETE FROM colleges WHERE college_id = $1`, [collegeId]);
        return result.rows;
    }

    // assignmentByUserId

    // createAssignment
    async createAssignment(userId, collegeId){
        const insertQuery = `
        INSERT INTO college_assignments (user_id, college_id)
        VALUES ($1, $2)
        RETURNING assignment_id;
        `;

        const result = await db.query(insertQuery, [userId, collegeId]);

        return result.rows[0];
    }


    // deleteAssignment
    async deleteAssignment(userId, collegeId){
        const result = await db.query(`DELETE FROM college_assignments WHERE user_id = $1 AND college_id = $2`, [userId, collegeId]);
        return result.rows;
    }

    // fetchFromScorecard
    /**
     * Fetch school data from collegescorecard api
     * @param {string} namePrefix - name to search by
     * @param {string[]} desiredFields - limit desired fields, defaults to all fields
     * @param {bool} findExact - return names with exact matches only, defaults to false
     * @returns {object} If findExact, an object of the school info is returned. If not, a paged object of all autocomplete matches 
     */
    async fetchFromScorecard(namePrefix, desiredFields=[], findExact=false, page=0, perPage=20){
        
        // DOCUMENTATION: https://github.com/RTICWDT/open-data-maker/blob/master/API.md
        // Technically should be in a env or smth but who cares ++ this is a get only endpoint  
        const SCORECARD_API_KEY="BPGdOVwiRg9I45TLDD1bQfIxQjZW24K49ZEraSbS";

        // reformat spaces for url
        const formattedPrefix=namePrefix.replace(/ /g, '%20');

        let baseURL="https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key="+SCORECARD_API_KEY+"&page="+page+"&per_page="+perPage;

        if(formattedPrefix.length!=0){
            baseURL+="&school.name="+formattedPrefix;
        }

        if(desiredFields.length!=0){
            baseURL+="&fields="+desiredFields.join(",");
        }

        const response = await fetch(baseURL);
        const data = await response.json();
        console.log(baseURL);
        if(findExact){
            for (const result of data.results) {
                if (result["school.name"] === namePrefix) {
                    return result;
                }
            }
            return {};
        }
        return data;
    }

}

module.exports = new collegeController();