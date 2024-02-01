require("dotenv").config();
const db = require("../db");
const bcrypt = require("bcrypt");

class userController {

    static filterMap = new Map();

    constructor() {
        userController.filterMap.set('allUsers', () => this.allUsers(false));
        userController.filterMap.set('userByName', (userName) => this.userByName(userName, false));
        userController.filterMap.set('userBySport', (sport) => this.userBySport(sport, false));
        userController.filterMap.set('userByMajor', (major) => this.userByMajor(major, false));
    }

    // allUsers
    async allUsers(directCall=true) {
        const queryStr = "SELECT * FROM master_users";
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

    // userById
    async userById(userId, directCall=true){
        const queryStr = "SELECT * FROM master_users WHERE user_id = $1";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    [userId]
                );
                return result.rows;
            }
            catch(error){
                return error;
            }
        } else {
            return [queryStr, [userId]];
        }
    }

    // userByName
    async userByName(userName, directCall=true){
        try{
            // If there is no space in userName, check for matches with first and last name
            let result = null;
            if(!userName.includes(" ")) {
                console.log("1");
                const queryStr = "SELECT * FROM master_users WHERE LOWER(user_firstname) LIKE LOWER($1) OR LOWER(user_lastname) LIKE LOWER($1)";
                if (directCall) {
                    result = await db.query(
                        queryStr + ";",
                        [userName]
                    );
                } else {
                    return [queryStr, [userName]];
                }
            } else {
                console.log("2");
                // If there is a space in userName, check for matches with first and last name
                const queryStr = "SELECT * FROM master_users WHERE LOWER(user_firstname) LIKE LOWER($1) AND LOWER(user_lastname) LIKE LOWER($2)";
                const names = userName.split(" ");
                if (directCall) {
                    result = await db.query(
                        queryStr + ";",
                        [names[0], names[1]]
                    );
                } else {
                    return [queryStr, [names[0], names[1]]];
                }
            }
            return result.rows;
        }
        catch(error){
            return error;
        }
    }

    // userBySport
    async userBySport(sport, directCall=true){
        const queryStr = "SELECT * FROM master_users WHERE LOWER(user_sport1) LIKE LOWER($1) OR LOWER(user_sport2) LIKE LOWER($1)";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    ['%' + sport + '%']
                );
                return result.rows;
            }
            catch(error){
                return error;
            }
        } else {
            return [queryStr, ['%' + sport + '%']];
        }
    }

    // userByMajor
    async userByMajor(major, directCall=true) {
        const queryStr = "SELECT * FROM master_users WHERE LOWER(user_potential_major) LIKE LOWER($1) OR LOWER(user_alt_major1) LIKE LOWER($1) OR LOWER(user_alt_major2) LIKE LOWER($1)";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    ['%' + major + '%']
                );
                
                return result.rows;
            } catch (error) {
                return error;
            }
        } else {
            return [queryStr, ['%' + major + '%']];
        }
    }

    // createUser
    async createUser(userData) {
        if (
            !userData||
            !(
                userData.user_email &&
                userData.user_password &&
                userData.user_firstname &&
                userData.user_lastname
            )
        ) {
          console.log("Missing mandatory field");
          return false;
        }
    
        const email = userData.user_email;
        const query = `SELECT COUNT(*) AS count FROM master_users WHERE user_email = '${email}'`;
    
        const emailMatch = await db.query(query, []);
    
        if (emailMatch.rows[0].count != 0) {
          //email already exists
          console.log("Matching email already exists");
          return false;
        }

        // hash password
        userData.user_password = await bcrypt.hash(userData.user_password, 10);
    
        //taken from
        const insertKeys = Object.keys(userData);
        const insertValues = Object.values(userData);
    
        // create placeholder values ($1, $2, etc.) for each value to be inserted
        const placeholders = insertKeys
          .map((_, index) => `$${index + 1}`)
          .join(", ");
    
        const insertQuery = `
                INSERT INTO master_users (${insertKeys.join(", ")})
                VALUES (${placeholders});
            `;
        const userIdQuery = `
                SELECT user_id FROM master_users WHERE user_email = '${email}'
            `;
        try {
            await db.query(insertQuery, insertValues);
            const result = await db.query(userIdQuery, []);
            const newUserId = result.rows[0].user_id;
            await db.query(
                "INSERT INTO user_status (user_id, user_status) VALUES ($1, 0);",
                [newUserId]
            );
        } catch (error) {
            return error;
        }
    
        return true;
    }
    // editUser
    async editUser(newFields, userId) {
        try {
            if (typeof newFields["user_password"] !== "undefined") {
                newFields["user_password"] = await bcrypt.hash(password, 10);
            }

            const query =
                "UPDATE master_users SET " +
                Object.keys(newFields)
                .map((column) => column + "='" + newFields[column] + "'")
                .join(", ") +
                " WHERE user_id=" +
                userId +
                " RETURNING *;";
            const result = await db.query(query, []);
            return result.rows;
        } catch (error) {
            return error;
        }
    }

    // deleteUser
    async deleteUser(userId) {
        try {
            await db.query("DELETE FROM college_assignments WHERE user_id = $1", [userId]);
            await db.query("DELETE FROM user_status WHERE user_id = $1", [userId]);
            const result = await db.query(
                "DELETE FROM master_users WHERE user_id = $1",
                [userId]
            );
            return result.rows;
        }
        catch (error) {
            return error;
        }
    }

    // unapprovedUsers
    async unapprovedUsers() {
        const query = `SELECT *
        FROM master_users
        JOIN user_status ON master_users.user_id = user_status.user_id
        WHERE user_status.user_status = 0;`
        const result = await db.query(query, []);
        return result.rows;
    }

    // approveUser
    async approveUser(userId){
        try {
            const result = await db.query(
                "UPDATE user_status SET user_status = 1 WHERE user_id = $1",
                [userId]
            );
             return result.rows;
        } catch (error) {
            return error;
        }
    }


    // validateUser
    async validateUser(email, password) {
        // ensure the user exists in the master_users table
        const userQuery = await db.query(
            'SELECT * FROM master_users WHERE user_email = $1',
            [email]
        );

        if (userQuery.rows.length === 0) // user not found
            return [-1, -1];
    
        const user = userQuery.rows[0];
    
        // if passwords do not match, user is invalid
        if (!await bcrypt.compare(password, user.user_password)) {
            return [-1, -1];
        }
        
        // retrieve the user's status based on user_id
        const statusQuery = await db.query(
            'SELECT user_status FROM user_status WHERE user_id = $1',
            [user.user_id]
        );


        if (statusQuery.rows.length > 0) {
            return [user.user_id, statusQuery.rows[0].user_status, user.user_firstname];
        }
        else {
            return [-1, -1];
        }
    }

    // assignmentsByUserId
    async assignmentsByUserId(userId){
        try {
            const result = await db.query(
                "SELECT * FROM college_assignments WHERE user_id = $1;",
                [userId]
            );
            return result.rows;
        }
        catch(error){
            return error;
        }
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
        filterFields.forEach((field, idx) => {
            if (fields[field] != null) {
                userController.filterMap.get(field)(fields[field]).then((res) => {
                    if (res != undefined) {
                        if (idx > 0) {
                            queryStr.push(" INTERSECT ");
                        }
                        if (res[1].length === 1) {
                            queryParams.push(res[1][0]);
                            queryStr.push(res[0].replaceAll("$1", "$" + queryParams.length));
                        } else {
                            let newQueryStr = res[0];
                            queryParams.push(res[1][0]);
                            newQueryStr.replaceAll("$1", "$" + queryParams.length)
                            queryParams.push(res[1][1]);
                            newQueryStr.replaceAll("$2", "$" + queryParams.length)
                            queryStr.push(newQueryStr);
                        }
                    }
                });
            } else {
                userController.filterMap.get(field)().then((res) => {
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

    // collegesFiltered
    // uses generated intersected sql call and params to get filtered results
    async usersFiltered(fields) {
        // queryValues = [queryStr : string[], queryParams : object[]]
        let queryValues = await this.generateFilterQuery(fields);
        console.log(queryValues[0].join(''));
        console.log(queryValues[1]);
        const result = await db.query(queryValues[0].join(''), queryValues[1]);
        return result.rows;
    }

}

module.exports = new userController();