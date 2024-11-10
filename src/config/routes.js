const middleware = require('./middleware/tokenValidator');
const authController = require('../controller/authController');
const recipeController = require('../controller/recipeController');
const planController = require('../controller/planController');
const userController = require('../controller/userController');


module.exports = (app) => {
    app.get('/', (req, res) => {res.send('nemesis');});
    app.post('/validate', middleware.validateAdmToken , (req, res) => {res.status(201).send({status: true, msg: "success"})});

    app.post('/auth', authController.auth);
    app.post('/register', authController.register);

    app.get('/user/detail', middleware.validateToken ,userController.getById);
    
    app.post('/subscription/detail', middleware.validateToken ,userController.getById);
    app.post('/subscription/detail', middleware.validateToken ,userController.getById);


    app.get('/recipe/list', middleware.validateToken ,recipeController.list)
    app.get('/recipe/detail', middleware.validateToken, recipeController.getById)
    app.post('/recipe/create', middleware.validateToken ,recipeController.create);
    //app.post('/recipe/update', middleware.validateToken ,recipeController.update);

    app.get('/recipe/filters', middleware.validateToken, recipeController.filters)
    app.post('/recipe/filters', middleware.validateToken, recipeController.createFilters);

    app.get('/plan/list', middleware.validateToken ,planController.list);
    app.get('/plan/detail', middleware.validateToken ,planController.getById);
    app.post('/plan/create', middleware.validateToken ,planController.create);
    //app.post('/plan/update', middleware.validateToken ,planController.update);


    

    
}