const express = require('express');
const router = express.Router();

const localAuth = require('../auth/local');
const authHelpers = require('../auth/_helpers');

router.post('/signup', async (req, res, next) => {
  try {
    const dbUser = await authHelpers.createUser(req);
    const token = localAuth.encodeToken(dbUser.rows[0]);
    const firstName = dbUser.rows[0].first_name;
    const id = dbUser.rows[0].id;
    res.status(200).json({
      status: 'success',
      token,
      firstName,
      id
    });
  } catch (err) {
    res.status(500).json({
      status: err
    });
  }
});

router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.passwd;

  try {
    const dbUser = await authHelpers.getUser(email);
    const verifiedUser = authHelpers.comparePassword(
      password,
      dbUser.rows[0].passwd
    );
    if (verifiedUser) {
      const token = localAuth.encodeToken(dbUser.rows[0]);
      console.log(dbUser.rows[0]);
      const firstName = dbUser.rows[0].first_name;
      const id = dbUser.rows[0].id;
      res.status(200).json({
        status: 'success',
        token,
        firstName,
        id
      });
    }
  } catch (err) {
    res.status(500).json({
      status: err.message
    });
  }
});

router.get('/user', authHelpers.ensureAuthenticated, (req, res, next) => {
  res.status(200).json({
    status: 'success'
  });
});

module.exports = router;
