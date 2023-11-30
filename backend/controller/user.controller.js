require("dotenv").config();
const db = require("../db");



class userController {

    // userById

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

}

module.exports = new userController();