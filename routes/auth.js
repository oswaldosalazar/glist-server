const express = require('express');
const router = express.Router();

const localAuth = require('../auth/local');
const authHelpers = require('../auth/_helpers');

router.post('/register', async (req, res, next) => {
  try {
    const user = await authHelpers.createUser(req);
    const token = localAuth.encodeToken(user.rows[0]);
    res.status(200).json({
      status: 'success',
      token: token
    });
  } catch (err) {
    res.status(500).json({
      status: err
    });
  }
});

module.exports = router;
