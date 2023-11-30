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

    // userByMajor

    // createUser

    // editUser

    // deleteUser

    // unapprovedUsers

    // approveUser

    // validateUser

}

module.exports = new userController();