require("dotenv/config")
const express = require("express")
const server = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require("./src/main")
const database = require("./src/config/Databases")
const redis = require("./src/config/redis")
const port = 9000
const cors = require("cors")

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(morgan("dev"))
server.use(cors())

server.use(routes)

database.connect()
    .then((result) => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Database not connected")
    });


redis
    .redisChek()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    });


server.get("/", (req, res) => {
    res.send("API connected.")
})
server.listen(port, () => {
    console.log(`Service running on port http://localhost:${port}`)
})