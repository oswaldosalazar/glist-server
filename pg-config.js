const databaseName = 'node_token_auth';

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://oswaldosalazar:new_password@localhost:5432/${databaseName}`
  }
};
