require("dotenv").config();
const db = require("../db");
const bcrypt = require("bcrypt");

class userController {

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

    // paginatedApprovedUsers
    async paginatedApprovedUsers(pageNumber) {
        // page size is 6
        const PAGE_SIZE = 6;
        const offset = (pageNumber - 1) * PAGE_SIZE;

        // gets userID, email, first name, last name, major, and sport
        const query = `SELECT master_users.user_id, master_users.user_email, master_users.user_firstname, master_users.user_lastname, master_users.user_potential_major, master_users.user_sport1
        FROM master_users
        JOIN user_status ON master_users.user_id = user_status.user_id
        WHERE user_status.user_status = 1
		ORDER BY user_firstname
        LIMIT $1 OFFSET $2;`

        const result = await db.query(query, [PAGE_SIZE, offset]);

        const totalCount = (await this.allUsers()).length;
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        return {
            totalPages: totalPages,
            page: pageNumber,
            approvedUsers: result.rows
        };
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
                userData.user_lastname &&
                userData.user_school
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

    // paginatedUnapprovedUsers
    async paginatedUnapprovedUsers(pageNumber) {
        // page size is 6
        const PAGE_SIZE = 6;
        const offset = (pageNumber - 1) * PAGE_SIZE;

        const query = `SELECT master_users.user_id, master_users.user_email, master_users.user_firstname, master_users.user_lastname, master_users.user_school
        FROM master_users
        JOIN user_status ON master_users.user_id = user_status.user_id
        WHERE user_status.user_status = 0
        LIMIT $1 OFFSET $2;`
        const result = await db.query(query, [PAGE_SIZE, offset]);

        const totalCount = (await this.unapprovedUsers()).length;
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        return {
            totalPages: totalPages,
            page: pageNumber,
            unapprovedUsers: result.rows
        };
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
        // *** TO DELETE, ONLY FOR TESTING PURPOSES
        // allows for empty passwords for manually inputted test data
        if (password === '' && password === user.user_password)
        {}
        // *** TO DELETE ONLY FOR TESTING PURPOSES
        else if (!await bcrypt.compare(password, user.user_password)) {
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

    async userByEmail(email, directCall=true){
        const queryStr = "SELECT * FROM master_users WHERE user_email = $1";
        if (directCall) {
            try {
                const result = await db.query(
                    queryStr + ";",
                    [email]
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

    sqlBuilder(fields, pageNumber) {

        let query="SELECT * FROM master_users JOIN user_status ON master_users.user_id = user_status.user_id";
        let wheres=["user_status.user_status = 0"];

        if("userByName" in fields && fields["userByName"]!=null && fields["userByName"]!=""){
            wheres.push("(LOWER(CONCAT('%', user_firstname, '%')) LIKE LOWER('%"+fields["userByName"]+"%') OR LOWER(CONCAT('%', user_lastname, '%')) LIKE LOWER('%"+fields["userByName"]+"%') OR LOWER(CONCAT(user_firstname, ' ', user_lastname)) LIKE LOWER('%"+fields["userByName"]+"%'))");
        }
        if("userBySport" in fields && fields["userBySport"]!=null && fields["userBySport"]!=""){
            wheres.push("(LOWER(user_sport1) LIKE LOWER('"+fields["userBySport"]+"') OR LOWER(user_sport2) LIKE LOWER('"+fields["userBySport"]+"'))");
        }
        if("userByMajor" in fields && fields["userByMajor"]!=null && fields["userByMajor"]!=""){
            wheres.push("(LOWER(user_potential_major) LIKE LOWER('"+fields["userByMajor"]+"') OR LOWER(user_alt_major1) LIKE LOWER('"+fields["userByMajor"]+"') OR LOWER(user_alt_major2) LIKE LOWER('"+fields["userByMajor"]+"'))");
        }

        const sqlWhere=wheres.join(" AND ");

        const PAGE_SIZE = 6;
        const offset = (pageNumber - 1) * PAGE_SIZE;
        const sqlStr = " ORDER BY user_firstname LIMIT "+PAGE_SIZE+" OFFSET "+offset+";";

        return [query+" WHERE "+sqlWhere+";", query+" WHERE "+sqlWhere+sqlStr];

    }

    async paginatedUsersFiltered(fields, pageNumber){

        // page size is 6
        const PAGE_SIZE = 6;
        // Make one not paginated to calculate total pages
        const [filteredUserQuery, filteredPaginatedUserQuery] = this.sqlBuilder(fields, pageNumber);

        const filteredPaginatedUserResult = await db.query(filteredPaginatedUserQuery);
        const filteredUserResult = await db.query(filteredUserQuery);

        const totalCount = filteredUserResult.rows.length;
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        return {studentData: filteredPaginatedUserResult.rows, pageNumber: pageNumber, totalPages: totalPages};
    }

}

module.exports = new userController();