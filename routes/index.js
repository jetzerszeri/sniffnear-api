const usersRoutes = require('./usersRoutes.js');
const petsRoutes = require('./petsRoutes.js');
const alertRoutes = require('./alertRoutes.js');
const blogRoutes = require('./blogRoutes.js');
const adoptionRoutes = require('./adoptionRoutes.js');
const chatRoutes = require('./chatRoutes.js');
const routerApi = function (app) {
    app.use('/api/users', usersRoutes);
    app.use('/api/pets', petsRoutes);
    app.use('/api/alerts', alertRoutes);
    app.use('/api/blog', blogRoutes);
    app.use('/api/adoption', adoptionRoutes);
    app.use('/api/chats', chatRoutes);
}

module.exports = routerApi;