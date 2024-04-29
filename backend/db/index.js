require('dotenv').config();
const { Pool } = require("pg");
const pg = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};