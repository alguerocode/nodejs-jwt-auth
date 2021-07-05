const isEmail = require('validator').isEmail;
const pool = require('../db_pool');


module.exports.signupValidation = async (req, res, next) => {
  try {
    const credentials = req.body;
    const errors = { email: "", password: "", username: "", error: false };
    const email = await pool.query('SELECT user_email FROM users WHERE user_email = $1', [credentials.user_email]);
    if (email.rows.length > 0) {
      errors.email = "user email already exist";
      res.status(400).json({ errors });
      return;
    }
    if (credentials.username.length < 6) {
      errors.username = "username should be at least 6 characters";
      errors.error = true;
    }
    if (credentials.user_password.length < 6) {
      errors.password = "password should be at least 6 characters";
      errors.error = true;
    }
    if (!isEmail(credentials.user_email)) {
      errors.email = "email are not valid";
      errors.error = true;
    }
    if (errors.error) {
      res.status(400).json({ errors });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).send('not valid credetials');
    console.log(error.message);
  }
}


module.exports.loginValidation = async (req, res, next) => {
  try {
    const { user_email } = req.body;
    const errors = { email: "" };
    const email = await pool.query('SELECT user_email FROM users WHERE user_email = $1', [user_email]);
    if (email.rows.length === 0) {
      errors.email = "email are not exist";
      res.status(400).json({ errors });
    } else {
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};