const usersRoutes = require('./usersRoutes.js');
const petsRoutes = require('./petsRoutes.js');
const alertRoutes = require('./alertRoutes.js');


const routerApi = function (app) {
    app.use('/api/users', usersRoutes);
    app.use('/api/pets', petsRoutes);
    app.use('/api/alerts', alertRoutes);
}

module.exports = routerApi;