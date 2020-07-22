module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://${process.env.PG_USER}:${process.env.PG_PASSWD}@${process.env.PG_URL_DEV}/${process.env.PG_DB_NAME}`
  }
};
