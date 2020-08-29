const express = require('express');
const router = express.Router();

// const localAuth = require('../auth/local');
const listsQueries = require('../controllers/lists-queries');

// const indexController = require('../controllers/index');

// router.get('/lists', function (req, res, next) {
// indexController.sum(1, 2, (error, results) => {
//   if (error) return next(error);
//   if (results) {
//     res.json({ sum: results });
//   }
// });
// });

router.post('/add-list', async (req, res, next) => {
  try {
    const dbUser = await listsQueries.addList(req);
    // const token = localAuth.encodeToken(dbUser.rows[0]);
    // const firstName = dbUser.rows[0].first_name;
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: err
    });
  }
});

module.exports = router;
