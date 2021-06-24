const express = require("express")
const helmet = require("helmet")
const usersRouter = require("./router/users/users-router")
const server = express()
const cors = require('cors');

server.use(helmet())
server.use(cors());
server.use(express.json())

server.use('/', usersRouter)
server.use('/api/register',usersRouter)
server.use('/api/login', usersRouter)
server.use('/api/users', usersRouter)

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server