
const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const Users = require('../router/users-model');
const checkCredentials = require('../../middleware/check-payload')
const secrets = require('../../../config/secrets')


const posts = [
	{
		username: 'Lily',
		title: 'Post 1',
	},
	{
		username: 'Arely',
		title: 'Post 2',
	},
]
router.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to Pintereach-2"
	})
})

//trying this route to see if my database is working
router.get("/api/users", async (req, res, next) => {
	Users.find(Users) 
	.then((Users) => {
		res.status(200).json(Users)
	})
	.catch((error) => {
		next(error)
	})
})

router.post("/api/register", checkCredentials, (req, res,next) =>{
	let user  = req.body;
  // bcrypting the password before saving
	const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
	const hash = bcrypt.hashSync(user.password, rounds);

  // never save the plain text password in the db
	user.password = hash
	

	Users.add(user)
    .then(user => {
		const token = authenticateToken(user);
      res.status(201).json({

        message: `Great to have you, ${user.username}`,
        token
      });
    })
    .catch(next); // our custom err handling middleware in server.js will trap this
})

router.post("/api/login", checkCredentials, (req, res, next)=>{
	let { username, password } = req.body;

  Users.findBy({ username: username }) // it would be nice to have middleware do this
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = authenticateToken(user)
        res.status(200).json({
          message: `Welcome back ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(next);
})


router.get('/api/posts' ,  authenticateToken,(req, res) => {
	res.json(posts.filter(post => post.username === req.user.name))
	
	
})


function authenticateToken(user){
	// const authHeader = req.headers['authorization']
	// const token = authHeader && authHeader.split(' ')[1]
	
	// if(token == null) return res.sendStatus(401)
	
	// jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
	// 	if(err) return res.sendStatus(403)
	// 	req.user = user
	// 	next()
	// })
	const payload = {
		subject: user.id,
		username: user.username,
	}
	const options= {
		expiresIn:'1d'
	}
	
	const secret = secrets.jwtSecret;
	return jwt.sign(payload,secret,options)
	
}

module.exports = router;