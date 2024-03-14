require("dotenv").config();
const db = require("../db");


class mentorController {

    // allMentors

    // mentorById

    // mentorByName

    // mentorByMajor

    // mentorBySport

    // createMentor
    async createMentor(mentorData) {
        const insertKeys = Object.keys(mentorData);
        const insertValues = Object.values(mentorData);
      
        // create placeholder values ($1, $2, etc.) for each value to be inserted
        const placeholders = insertKeys
            .map((_, index) => `$${index + 1}`)
            .join(", ");

        const insertQuery = `
                INSERT INTO mentors (${insertKeys.join(", ")})
                VALUES (${placeholders})
                RETURNING mentor_id;
            `;

        const result = await db.query(insertQuery, insertValues);

        return result.rows[0];
    }

    // editMentor
    async editMentor(newFields, mentorId) {        
        try {
            const query =
                "UPDATE mentors SET " +
                Object.keys(newFields)
                .map((column) => column + "='" + newFields[column] + "'")
                .join(", ") +
                " WHERE mentor_id=" +
                mentorId +
                " RETURNING *;";
            const result = await db.query(query, []);
            return result.rows;
        } catch (error) {
            return error;
        }
    }

    // deleteMentor
    async deleteMentor(mentorId) {
        // delete mentor
        const result = await db.query(`DELETE FROM mentors WHERE mentor_id = $1`, [mentorId]);
        return result.rows;
    }

}

module.exports = new mentorController();