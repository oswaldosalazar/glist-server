const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/_helpers');
const listsQueries = require('../controllers/lists-queries');

router.post(
  '/add-list',
  authHelpers.ensureAuthenticated,
  async (req, res, next) => {
    try {
      const dbUser = await listsQueries.addList(req);
      res.status(200).json({
        status: 'success'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: err
      });
    }
  }
);

module.exports = router;
