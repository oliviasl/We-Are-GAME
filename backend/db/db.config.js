const { Sequelize, Model, DataTypes } = require("sequelize");
const pg = require('pg');

const connect = () => {

    const hostName = process.env.HOST;
    const userName = process.env.USER;
    const password = process.env.PASSWORD;
    const database = process.env.DB;
    const dialect = process.env.DIALECT;
    const port = process.env.PORT;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        port: port,
        dialect: dialect,
        operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.colleges = require("../model/colleges.model")(sequelize, DataTypes, Model);
    db.college_assignments = require("../model/college_assignments.model")(sequelize, DataTypes, Model);
    db.master_users = require("../model/master_users.model")(sequelize, DataTypes, Model);
    db.user_status = require("../model/user_status.model")(sequelize, DataTypes, Model);
    db.mentors = require("../model/mentors.model")(sequelize, DataTypes, Model);

    return db;
}

module.exports = {
    connect
}