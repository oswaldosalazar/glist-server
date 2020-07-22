const localAuth = require('./local');
const bcrypt = require('bcryptjs');
const { Pool, Client } = require('pg');
const connectionString = require('../pg-config');
const moment = require('moment');

const client = new Client(connectionString.development.connection);

client.connect();

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.passwd, salt);
  const timestamp = moment();
  const text =
    'INSERT INTO auth.users(email, passwd, created_at) VALUES($1, $2, $3) RETURNING *';
  const values = [req.body.email, hash, timestamp];

  return client.query(text, values);
}

function getUser(email) {
  const text = 'SELECT * FROM auth.users WHERE email = $1 FETCH FIRST ROW ONLY';
  const values = [email];

  return client.query(text, values);
}

function comparePassword(userPassword, databasePassword) {
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  if (!bool) throw new Error('Email and password combination does not exist');
  else return true;
}

module.exports = {
  createUser,
  getUser,
  comparePassword
};
