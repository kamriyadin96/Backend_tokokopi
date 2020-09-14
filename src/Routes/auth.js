const express = require("express")
const controller = require("../controller/auth")
const Route = express.Router()

Route.post("/", controller.login)

module.exports = Route