const express = require("express")
const helmet = require("helmet")
const usersRouter = require("./api/users/router/users-router")
const server = express()
const cors = require('cors');

server.use(helmet())
server.use(cors());
server.use(express.json())

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server