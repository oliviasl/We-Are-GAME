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
    async unapprovedUsers() {
        const query = `SELECT *
        FROM master_users
        JOIN user_status ON master_users.user_id = user_status.user_id
        WHERE user_status.user_status = 0;`
        const result = await db.query(query, []);
        return result.rows;
    }

    // approveUser

    // validateUser

}

module.exports = new userController();