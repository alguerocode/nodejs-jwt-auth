const Router = require('express').Router;
const authController = require('../controllers/auth');
const validation = require('../middleware/validation');
const authRoute = Router();

authRoute.post('/signup',validation.signupValidation ,authController.signup);
authRoute.post('/login', validation.loginValidation,authController.login);
authRoute.post('/logout',authController.logout);
authRoute.get('/verify',authController.verify)

module.exports = authRoute;