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