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

function ensureAuthenticated(req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(400).json({
      status: 'Please log in'
    });
  }

  const header = req.headers.authorization.split(' ');
  const token = header[1];

  localAuth.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token has expired'
      });
    } else {
      const text =
        'SELECT * FROM auth.users WHERE id = $1 FETCH FIRST ROW ONLY';
      const values = [payload.sub];
      console.log(payload.sub);
      return client
        .query(text, values)
        .then(user => {
          next();
        })
        .catch(err => {
          res.status(500).json({
            status: 'error'
          });
        });
    }
  });
}

module.exports = {
  createUser,
  getUser,
  comparePassword,
  ensureAuthenticated
};
