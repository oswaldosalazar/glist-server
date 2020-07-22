const express = require('express');
const router = express.Router();

const localAuth = require('../auth/local');
const authHelpers = require('../auth/_helpers');

router.post('/signup', async (req, res, next) => {
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
      res.status(200).json({
        status: 'success',
        token: token
      });
    }
  } catch (err) {
    res.status(500).json({
      status: err.message
    });
  }
});

// router.post('/login', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   return authHelpers
//     .getUser(username)
//     .then(response => {
//       authHelpers.comparePass(password, response.password);
//       return response;
//     })
//     .then(response => {
//       return localAuth.encodeToken(response);
//     })
//     .then(token => {
//       res.status(200).json({
//         status: 'success',
//         token: token
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         status: 'error'
//       });
//     });
// });

module.exports = router;
