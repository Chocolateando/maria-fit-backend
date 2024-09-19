const middleware = require('./middleware/tokenValidator');
const authController = require('../controller/authController');

module.exports = (app) => {
    app.get('/', (req, res) => {res.send('nemesis');});
    app.post('/validate', middleware.validateAdmToken , (req, res) => {res.status(201).send({status: true, msg: "success"})});
    app.post('/auth', authController.auth);
    app.post('/register');
    app.get('/recipe/list')
    app.get('/recipe/detail/{id}')
    app.get('')

}