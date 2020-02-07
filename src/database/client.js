require('dotenv/config');

const pg = require('pg');

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const isProduction = `${process.env.NODE_ENV}` === 'production';

const client = new pg.Client({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

module.exports = client;
