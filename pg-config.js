const databaseName = 'node_token_auth';

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://oswaldosalazar:password@localhost:5432/${databaseName}`
  }
};
