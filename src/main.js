const express = require("express")
const product = require('./Routes/Product')
const history = require('./Routes/History')
const category = require('./Routes/Category')
const users = require("./Routes/users")
const auth = require("./Routes/auth")
const Routes = express.Router()


Routes.use("/product", product)
Routes.use("/history", history)
Routes.use("/category", category)
Routes.use("/users", users)
Routes.use("/auth", auth)



module.exports = Routes