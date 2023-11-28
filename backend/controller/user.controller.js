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

    // deleteUser

    // unapprovedUsers

    // approveUser

    // validateUser

}

module.exports = new userController();