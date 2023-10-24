const usersRoutes = require('./usersRoutes.js');
const petsRoutes = require('./petsRoutes.js');

const routerApi = function (app) {
    app.use('/api/users', usersRoutes);
    app.use('/api/pets', petsRoutes);
}

module.exports = routerApi;