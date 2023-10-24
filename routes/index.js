const usersRoutes = require('./usersRoutes.js');

const routerApi = function (app) {
    app.use('/api/users', usersRoutes);
}

module.exports = routerApi;