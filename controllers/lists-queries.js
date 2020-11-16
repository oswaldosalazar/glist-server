const bcrypt = require('bcryptjs');
const { Pool, Client } = require('pg');
const connectionString = require('../pg-config');

const client = new Client(connectionString.development.connection);

client.connect();

function addList(req) {
  console.log(req.body);
  const text =
    'INSERT INTO auth.lists(user_id, name, picked_items, pending_items, shared_with) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = [
    req.body.user_id,
    req.body.name,
    req.body.picked_items,
    req.body.pending_items,
    req.body.shared_with
  ];

  return client.query(text, values);
}

// Need to modify text, values to UPDATE query
function updateList(req) {
  console.log(req.body);
  const text =
    'INSERT INTO auth.lists(user_id, name, picked_items, pending_items, shared_with) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = [
    req.body.user_id,
    req.body.name,
    req.body.picked_items,
    req.body.pending_items,
    req.body.shared_with
  ];

  return client.query(text, values);
}

module.exports = {
  addList,
  updateList
};
