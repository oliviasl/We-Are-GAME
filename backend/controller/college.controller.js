require("dotenv").config();
const db = require("../db");

class collegeController {

    static filterMap = new Map();

    constructor() {
        collegeController.filterMap.set('allColleges', () => this.allColleges(false));
        collegeController.filterMap.set('collegeByName', (college_name) => this.collegeByName(college_name, false));
        collegeController.filterMap.set('collegeById', (collegeId) => this.collegeById(collegeId, false));
        collegeController.filterMap.set('collegeHasStuAthAcademicRes', () => this.collegeHasStuAthAcademicRes(false));
        collegeController.filterMap.set('collegeHasAcademicResource', () => this.collegeHasAcademicResource(false));
        collegeController.filterMap.set('collegeHasDiversityResource', () => this.collegeHasDiversityResource(false));
        collegeController.filterMap.set('collegeByGPA', (gpa) => this.collegeByGPA(gpa, false));
        collegeController.filterMap.set('collegeBySATRead', (satReadWrite) => this.collegeBySATRead(satReadWrite, false));
        collegeController.filterMap.set('collegeBySATMath', (satMath) => this.collegeBySATRead(satMath, false));
        collegeController.filterMap.set('collegeByACT', (act) => this.collegeByGPA(act, false));
    }

    // for all SELECT SQL calls
    /** 
    * @param {boolean} directCall - returns results of SQL call if true, otherwise returns SQL statement string and inputs, defaults true
    */

    async allColleges(directCall=true) {
        const queryStr = "SELECT * FROM colleges";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    []
                );
                return result.rows;
            } catch (error) {
                return error;
            }
        } else {
            return [queryStr];
        }
    }

    async collegeByName(college_name, directCall=true){
        const queryStr = "SELECT * FROM colleges WHERE LOWER(college_name) LIKE LOWER($1)";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    ['%' + college_name + '%']
                );
                return result.rows;
            }
            catch(error){
                return error;
            }
        } else {
            return [queryStr, '%' + college_name + '%'];
        }
    }
    
    async collegeById(collegeId, directCall=true){
        const queryStr = "SELECT * FROM colleges WHERE college_id = $1";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    [collegeId]
                );
                return result.rows;
            }
            catch(error){
                return error;
            }
        } else {
            return [queryStr, collegeId];
        }
      }
    
    async collegeHasStuAthAcademicRes(directCall=true) {
        const queryStr = "SELECT * FROM colleges WHERE stu_ath_academic_res_web_addr IS NOT NULL";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    []
                );
                return result.rows;
            } catch (error) {
                return error;
            }
        } else {
            return [queryStr];
        }
    }

    async collegeHasAcademicResource(directCall=true) {
        const queryStr = "SELECT * FROM colleges WHERE academic_resources_web_addr IS NOT NULL";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    []
                );
                return result.rows;
            } catch (error) {
                return error;
            }
        } else {
            return [queryStr];
        }
    }
  
  async collegeHasDiversityResource(directCall=true) {
        const queryStr = "SELECT * FROM colleges WHERE diversity_resources_web_addr IS NOT NULL";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    []
                );
                return result.rows;
            } catch (error) {
                return error;
            }
        } else {
            return [queryStr];
        }
    }

    async collegeByGPA(gpa, directCall=true) {
        const queryStr = "SELECT * FROM colleges WHERE $1 BETWEEN min_gpa AND max_gpa";
        if (directCall) {
            const result = await db.query(
                queryStr + ";",
                [gpa]
            );
            return result.rows;
        } else {
            return [queryStr, gpa];
        }
    }

    async collegeBySATRead(satReadWrite, directCall=true) {
        const queryStr = "SELECT * FROM colleges WHERE $1 BETWEEN min_sat_read_write AND max_sat_read_write";
        if (directCall) {
            const result = await db.query(
                queryStr + ";",
                [satReadWrite]
            );
            return result.rows;
        } else {
            return [queryStr, satReadWrite];
        }
    }

    async collegeBySATMath(satMath, directCall=true) {
        const queryStr = "SELECT * FROM colleges WHERE $1 BETWEEN min_sat_math AND max_sat_math";
        if (directCall) {
            const result = await db.query(
                queryStr + ";",
                [satMath]
            );
            return result.rows;
        } else {
            return [queryStr, satMath];
        }
    }

    async collegeByACT(act, directCall=true) {
        const queryStr = "SELECT * FROM colleges WHERE $1 BETWEEN min_act AND max_act";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    [act]
                );
                return result.rows;
            } catch (error) {
                return error;
            }
        } else {
            return [queryStr, act];
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

    // generateFilterQuery
    /**
     * Generates sql string and params for a combined filtered search
     * @param {object} fields - attributes have the search function name as the key and the input param as the value
     * @returns {[string[], object[]]}  - array of sql query substrings and array of parameters
     */
    async generateFilterQuery(fields) {
        const filterFields = Object.keys(fields);
        let queryStr = [];
        let queryParams = [];
        
        // null field values mean no input is required for that filter
        filterFields.forEach((field, idx) => {
            if (fields[field] != null) {
                collegeController.filterMap.get(field)(fields[field]).then((res) => {
                    if (res != undefined) {
                        if (idx > 0) {
                            queryStr.push(" INTERSECT ");
                        }
                        queryParams.push(res[1]);
                        queryStr.push(res[0].replace("$1", "$" + queryParams.length));
                    }
                });
            } else {
                collegeController.filterMap.get(field)().then((res) => {
                    if (res != undefined) {
                        if (idx > 0) {
                            queryStr.push(" INTERSECT ");
                        }
                        queryStr.push(res[0]);
                    }
                });
            }
        })
    
        return [queryStr, queryParams];
    }

    // // collegesFiltered
    // // uses generated intersected sql call and params to get filtered results
    async collegesFiltered(fields) {
        let queryValues = await this.generateFilterQuery(fields);
        console.log(queryValues[0].join(''));
        const result = await db.query(queryValues[0].join(''), queryValues[1]);
        return result.rows;
    }

}

module.exports = new collegeController();