/* eslint-disable no-console */
const pg = require('pg');

const config = {
  user: 'admin',
  database: 'sarri_complain',
  password: 'root',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

const createTables = () => {
  const complaintTable = `CREATE TABLE IF NOT EXISTS
      complaints(
        id SERIAL PRIMARY KEY,
        date VARCHAR(128) NOT NULL,
        complaints VARCHAR(128) NOT NULL
      )`;
  pool
    .query(complaintTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  createTables,
  pool
};

require('make-runnable');
