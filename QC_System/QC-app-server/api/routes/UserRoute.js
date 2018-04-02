'use strict';
module.exports = function(app) {
    var userController = require('../controllers/UserController');

    app.route('/users')
        .get(userController.list_all_users)
        .post(userController.create_a_user);

    app.route('/users/:userId')
        .get(userController.read_a_user)
        .put(userController.update_a_user)
        .delete(userController.delte);
};