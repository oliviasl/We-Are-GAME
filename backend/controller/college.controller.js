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
        collegeController.filterMap.set('collegeBySATMath', (satMath) => this.collegeBySATMath(satMath, false));
        collegeController.filterMap.set('collegeByACT', (act) => this.collegeByACT(act, false));
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

    //Helper function to store nested object paths - these could be hardcoded?
    getValueByIndex = (obj, index) => {
        const keys = index.split('.');
        let value = obj;
        for (const key of keys) {
            if (value && typeof value === 'object') {
                value = value[key];
            } else {
                return undefined; 
            }
        }
        return value;
    };

    async autofillCollege(name){
        //fetch data

        //MISSING FIELDS:
        /*
            - Yo like im not a high schooler but i swear i had more shit on the act/sat 
            { name: "title_iv.transf_completed_4yr_by.2yrs", index: "latest.completion.title_iv.transf_completed_4yr_by.2yrs" },
            -             { name: "act_scores.25th_percentile.writing", index: "latest.admissions.act_scores.25th_percentile.writing" },
            { name: "act_scores.75th_percentile.writing", index: "latest.admissions.act_scores.75th_percentile.writing" }, IS THERE A WRITING SECTION IN ACT
        */
       
        const DATA_TO_FETCH = [
            { columnName: "location_city", objectPath: "school.city" },
            { columnName: "location_state", objectPath: "school.state" },
            { columnName: "min_sat_read_write", objectPath: "latest.admissions.sat_scores.25th_percentile.critical_reading" },
            { columnName: "max_sat_read_write", objectPath: "latest.admissions.sat_scores.75th_percentile.critical_reading" },
            { columnName: "min_sat_math", objectPath: "latest.admissions.sat_scores.25th_percentile.math" },
            { columnName: "max_sat_math", objectPath: "latest.admissions.sat_scores.75th_percentile.math" },
            { columnName: "min_act", objectPath: "latest.admissions.act_scores.25th_percentile.cumulative" },
            { columnName: "max_act", objectPath: "latest.admissions.act_scores.75th_percentile.cumulative" },
            { columnName: "min_act_english", objectPath: "latest.admissions.act_scores.25th_percentile.english" },
            { columnName: "max_act_english", objectPath: "latest.admissions.act_scores.75th_percentile.english" },
            { columnName: "min_act_math", objectPath: "latest.admissions.act_scores.25th_percentile.math" },
            { columnName: "max_act_math", objectPath: "latest.admissions.act_scores.75th_percentile.math" },
            { columnName: "faculty_student_ratio", objectPath: "latest.student.demographics.student_faculty_ratio" },
            { columnName: "acceptance_rate", objectPath: "latest.admissions.admission_rate.overall", multiplier: 100 },
            { columnName: "race_white", objectPath: "latest.student.demographics.race_ethnicity.white", multiplier: 100 },
            { columnName: "race_black", objectPath: "latest.student.demographics.race_ethnicity.black", multiplier: 100 },
            { columnName: "race_hispanic", objectPath: "latest.student.demographics.race_ethnicity.hispanic", multiplier: 100 },
            { columnName: "race_asian", objectPath: "latest.student.demographics.race_ethnicity.asian", multiplier: 100 },
            { columnName: "race_native_american", objectPath: "latest.student.demographics.race_ethnicity.aian", multiplier: 100 },
            { columnName: "race_pacific_islander", objectPath: "latest.student.demographics.race_ethnicity.nhpi", multiplier: 100 },
            { columnName: "race_two_or_more", objectPath: "latest.student.demographics.race_ethnicity.two_or_more", multiplier: 100 },
            { columnName: "race_international", objectPath: "latest.student.demographics.race_ethnicity.non_resident_alien", multiplier: 100 },
            { columnName: "race_other", objectPath: "latest.student.demographics.race_ethnicity.unknown", multiplier: 100 },
            { columnName: "first_year_retention_rate", objectPath: "latest.student.retention_rate.four_year.full_time", multiplier:100 },
            { columnName: "cost_tuition_in_state", objectPath: "latest.cost.tuition.in_state" },
            { columnName: "cost_tuition_out_of_state", objectPath: "latest.cost.tuition.out_of_state" },
            { columnName: "avg_total_cost_est", objectPath: "latest.cost.avg_net_price.overall" },
            { columnName: "net_price_calc_web_addr", objectPath: "latest.school.price_calculator_url" },
        ];

        const response = await this.fetchFromScorecard(name, [], true, 0, 5);
        let collegeData = {};
        
        collegeData["college_name"] = name;
        DATA_TO_FETCH.forEach((datum) => {
            const value = this.getValueByIndex(response, datum.objectPath);
            if(value){
                collegeData[datum.columnName] = value.toString();
                if(datum?.multiplier){
                    collegeData[datum.columnName]=(Math.round(collegeData[datum.columnName]*datum.multiplier)).toString();
                }
            }
        });
        // this.createCollege(collegeData);
        //push to db
        return collegeData;
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

        if(findExact){ 
            if(desiredFields.length===0){
                for (const result of data.results) {
                    if (result.school["name"] === namePrefix) {
                        return result;
                    }
                }
            }else{
                for (const result of data.results) {
                    if (result["school.name"] === namePrefix) {
                        return result;
                    }
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
     * fields that don't require an input value must set null as the value
     * @returns {[string[], object[]]}  - array of sql query substrings and array of parameters
     */
    async generateFilterQuery(fields) {
        const filterFields = Object.keys(fields);
        let queryStr = [];
        let queryParams = [];

        
        // null field values mean no input is required for that filter
        for (const [idx, field] of filterFields.entries()) {
            if (fields[field] != null && fields[field] !== "") {
                // Await the promise and then process the result
                const res = await collegeController.filterMap.get(field)(fields[field]);
                if (res[0] !== undefined) {
                    if (typeof fields[field] === 'boolean' && fields[field] === false){
                        continue;
                    }
                    if (idx > 0 && queryStr.length > 0) { // Ensure INTERSECT is added only if needed
                        queryStr.push(" INTERSECT ");
                    }
                    if (res[1] !== undefined){
                        queryParams.push(res[1]);
                    }
                    queryStr.push(res[0].replace("$1", `$${queryParams.length}`));
                }
            } else if (fields[field] !== "") {
                const res = await collegeController.filterMap.get(field)();
                if (res !== undefined) {
                    if (idx > 0 && queryStr.length > 0) { // Ensure INTERSECT is added only if needed
                        queryStr.push(" INTERSECT ");
                    }
                    queryStr.push(res[0]);
                }
            }
        }
        const queryParamLength = queryParams.length;
        queryStr.push(` LIMIT $${queryParamLength + 1} OFFSET $${queryParamLength + 2}`);

    
        return [queryStr, queryParams];
    }

    // collegesFiltered
    // uses generated intersected sql call and params to get filtered results
    async collegesFiltered(fields, pageSize, offset) {
        // queryValues = [queryStr : string[], queryParams : object[]]
        if (!Object.values(fields).some(value => value)) {
            console.log("no fields");
            return this.allColleges();
        }
        let queryValues = await this.generateFilterQuery(fields);
        const queryParams = [...queryValues[1], pageSize, offset];
        const result = await db.query(queryValues[0].join(''), queryParams);
        return result.rows;
    }
  
    // paginated collegesFiltered
    async paginatedCollegesFiltered(fields, pageNumber) {
        // page size is 6
        const PAGE_SIZE = 7;
        const offset = (pageNumber - 1) * PAGE_SIZE;
        const partialResult = await this.collegesFiltered(fields, PAGE_SIZE, offset);
        const result = await this.collegesFiltered(fields);
        const totalCount = result.length;
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        return {
            totalPages: totalPages,
            page: pageNumber,
            colleges: partialResult
        };
    }

    async searchScorecard(name){

        const response = await this.fetchFromScorecard(name, ["school.name"], false, 0, 5);
        return response.results.map((datum) => datum["school.name"]);
    }
    
}

module.exports = new collegeController();