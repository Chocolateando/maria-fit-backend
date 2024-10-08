const middleware = require('./middleware/tokenValidator');
const authController = require('../controller/authController');
const recipeController = require('../controller/recipeController');


module.exports = (app) => {
    app.get('/', (req, res) => {res.send('nemesis');});
    app.get('/test', (req, res) => {res.send('test 2s');});
    app.post('/validate', middleware.validateAdmToken , (req, res) => {res.status(201).send({status: true, msg: "success"})});
    app.post('/auth', authController.auth);
    app.post('/register', authController.register);

    app.get('/recipe/list', middleware.validateToken ,recipeController.list)
    app.get('/recipe/detail', middleware.validateToken, recipeController.getById)
    app.post('/recipe/create', middleware.validateToken ,recipeController.create);
    //app.post('/recipe/update', middleware.validateToken ,recipeController.list);
    app.get('/recipe/categories', middleware.validateToken, recipeController.listCategories);
    app.get('/recipe/difficulty', middleware.validateToken, recipeController.listDifficulty);
    

    
}