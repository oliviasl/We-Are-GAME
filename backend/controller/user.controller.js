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
    async validateUser(email, password) {
        // ensure the user exists in the master_users table
        const userQuery = await db.query(
            'SELECT * FROM master_users WHERE user_email = $1',
            [email]
        );

        if (userQuery.rows.length === 0) // user not found
            return res.json([-1, -1]);
    
        const user = userQuery.rows[0];
    
        if (user.user_password !== password) // if passwords do not match, user is invalid
            return res.json([-1, -1]);
        
        // retrieve the user's status based on user_id
        const statusQuery = await pool.query(
            'SELECT user_status FROM user_status WHERE user_id = $1',
            [user.user_id]
        );

        // if user is valid, return required info
        if (statusQuery.rows.length > 0 && statusQuery.rows[0].user_status > 0)
            return res.json([user.user_id, statusQuery.rows[0].user_status]);
    }

}

module.exports = new userController();