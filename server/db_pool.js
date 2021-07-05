const Pool = require('pg').Pool;
require('dotenv').config();


const pool = new Pool({
  user:"YOUR_DB_USER",
  password:"YOUR_DB_PASSWORD",
  host:"YOUR_DB_HOST",
  port:"YOUR_DB_PORT",
  database:"YOUR_DB_DATABASE"
})
pool.connect((err) =>{
  if(err) {
    console.log(err);
  }
})

module.exports = pool;