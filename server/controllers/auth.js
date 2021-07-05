const pool = require('../db_pool');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const createToken = (id) => {
  return jwt.sign({ id }, 'salah95920350');
}


module.exports.login = async (req, res) => {
  try {
    const { user_password, user_email } = req.body;
    const data = await pool.query(
      'SELECT id,username, user_password FROM users WHERE user_email = $1',
      [user_email]
    );
    const user = data.rows[0];
    console.log(user);
    const isValidPassword = await bcrypt.compare(user_password, user.user_password);
    if (isValidPassword) {
      const token = createToken(user_password);
      res.cookie('token', token, {maxAge: 900000,httpOnly:false});
      res.status(200).json({ username: user.username });

    } else {
      res.status(400).json({ errors: { password: "wrong password added" } })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};


module.exports.signup = async (req, res) => {
  try {
    let { username, user_email, user_password } = req.body;

    // hashing
    const salt = await bcrypt.genSalt();
    user_password = await bcrypt.hash(user_password, salt);

    // inserting 
    const signup = await pool.query(`INSERT INTO users(id, username ,user_email ,user_password)VALUES(uuid_generate_v4(),$1 , $2 ,$3 ) RETURNING id;`,
                                    [username, user_email, user_password]);

    const token = createToken(signup.rows[0].id);

    res.cookie('token', token,{ maxAge: 900000,httpOnly:false});
    res.status(200).json({ username });

  } catch (err) {

    console.log(err);
  
  }
};


module.exports.logout = (req, res) => {
  try {

    res.cookie('token', '_blank', {
      maxAge: 1
    });

    res.status(200).json('user are logout');

  } catch (error) {
    console.log(error);
  }
};


module.exports.verify = async (req, res) => {
  try {
    const token = req.cookies.token
    if (token) {
      jwt.verify(token, 'salah95920350', async (err, decodedToken) => {
        if (err) {
          res.json({ validToken: false });
        } else {
          const username = await pool.query('SELECT username FROM users WHERE id =$1',[decodedToken.id]);
          res.json({validToken:true, username:username.rows[0].username});
        }
      })
    } else {
      res.json({ validToken: false }) 
    }
  } catch (err) {
    console.log(err);
  }
};