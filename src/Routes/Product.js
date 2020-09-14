const express = require("express")
const controller = require("../Controller/Product")
const validate = require('../middleware/validate')
const chace = require("../middleware/chace")
const upload = require("../middleware/upload")
const Route = express.Router()

Route.get("/", controller.all)
Route.post("/", upload.single("image"), controller.add)
//Route.post("/", controller.add)
Route.put("/", controller.edit)
Route.delete("/", controller.delete)
Route.get("/search", controller.search)
Route.get("/filter", controller.filter)

module.exports = Route