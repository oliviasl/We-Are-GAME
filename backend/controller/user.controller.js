require("dotenv").config();
const db = require("../db");


class userController {

    // userById

    // userByName

    // userBySport

    // userByMajor

    // createUser
    async createUser(userData) {
        console.log(userData);
        if(!(userData.user_email && userData.user_password && userData.user_firstname && userData.user_lastname)){
            console.log("Missing mandatory field");
            return false;
        }   

        const email = userData.user_email;

        const query = `SELECT COUNT(*) AS count FROM master_users WHERE user_email = '${email}'`;

        const emailMatch = await db.query(query, []);

        if(emailMatch.rows[0].count!=0){
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

    // deleteUser 

    // unapprovedUsers

    // approveUser

    // validateUser

}

module.exports = new userController();