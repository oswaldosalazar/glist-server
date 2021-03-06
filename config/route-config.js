(function (routeConfig) {
  'use strict';

  routeConfig.init = function (app) {
    //routes
    const routes = require('../routes/index');
    const authRoutes = require('../routes/auth');
    const listsRoutes = require('../routes/lists');

    // register routes
    app.use('/', routes);
    app.use('/auth', authRoutes);
    app.use('/lists', listsRoutes);
  };
})(module.exports);
