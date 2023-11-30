require("dotenv").config();
const db = require("../db");


class userController {

    // userById

    // userByName

    // userBySport

    // userByMajor

    // createUser

    // editUser

    // deleteUser

    // unapprovedUsers

    // approveUser
    async approveUser(email, password) {
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

    // validateUser

}

module.exports = new userController();