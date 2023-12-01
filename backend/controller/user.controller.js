require("dotenv").config();
const db = require("../db");



class userController {

    // userById

    async userById(userId){
        try {
            const result = await db.query(
                "SELECT * FROM master_users WHERE user_id = $1;",
                [userId]
            );
            return result.rows;
        }
        catch(error){
            return error;
        }
    }

    // userByName

    // userBySport
    async userBySport(sport){
        try {
            const result = await db.query(
                "SELECT * FROM master_users WHERE LOWER(user_sport1) LIKE LOWER($1) OR LOWER(user_sport2) LIKE LOWER($1);",
                ['%' + sport + '%']
            );
            return result.rows;
        }
        catch(error){
            return error;
        }
    }

    // userByMajor

    // createUser
    async createUser(userData) {
        if (
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
        try {
          await db.query(insertQuery, insertValues);
        } catch (error) {
          return error;
        }
    
        return true;
    }
    // editUser
    async editUser(newFields, userId) {
        try {
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
    
        if (user.user_password !== password) // if passwords do not match, user is invalid
            return [-1, -1];
        
        // retrieve the user's status based on user_id
        const statusQuery = await db.query(
            'SELECT user_status FROM user_status WHERE user_id = $1',
            [user.user_id]
        );

        // if user is valid, return required info
        if (statusQuery.rows.length > 0 && statusQuery.rows[0].user_status > 0)
            return [user.user_id, statusQuery.rows[0].user_status];
    }

}

module.exports = new userController();