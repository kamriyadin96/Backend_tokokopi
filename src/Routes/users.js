const express = require("express")
const controller = require("../controller/users")
const validate = require('../middleware/validate')
const chace = require("../middleware/chace")

const Route = express.Router()

Route.get("/", chace, controller.getAll)
Route.get("/", controller.getByUser)
Route.get("/:id", controller.getById)
Route.post("/", validate, chace,controller.addUsers)

Route.delete("/rm/:id", validate, controller.delUsers)

module.exports = Route