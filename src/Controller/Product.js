const model = require("../Model/Product")
const result = require("../helpers/respon")
const redis = require("../config/redis")
const Product = {}

Product.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("productAll", 30, data_redis)
        return result(res, 200, data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Product.add = async (req, res) => {
    try {
        if (req.file === undefined){
            console.log(req.file)
            return res.status(500).json("Data Kosong")
        }   
        const datas = {
            name: req.body.name,
            price : req.body.price,
            image: req.file.path,
        }
        console.log(datas)
        const data = await model.Add(datas)
        console.log(data)
        return respon(res, 201, datas)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }

}

Product.edit = async (req, res) => {
    try {
        const { id, name, image, price, category } = req.body
        const data = await model.Edit(id, name, image, price, category)
        return res.send({ success: true, message: "Update successfuly." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

Product.delete = async (req, res) => {
    try {
        const { id } = req.body
        const data = await model.Delete(id)
        if (data.rowCount > 0) {
            return res.send({ success: true, message: "Delete successfuly." })
        } else {
            return res.status(500).send({ success: false, message: `No data with id ${id}` })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

Product.search = async (req, res) => {
    try {
        const name = req.query.name
        const sensitive = req.query.sensitive
        const data = await model.Search(name, sensitive)
        if (data.rowCount > 0) {
            return res.send(data.rows)
        } else {
            return res.send({ success: true, message: "not found." })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

Product.filter = async (req, res) => {
    try {
        const type = req.query.type
        const orderBy = req.query.order
        const data = await model.Filter(type, orderBy)
        if (data != false) {
            return res.send(data.rows)
        } else {
            return res.send({ success: false, message: "wrong query." })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = Product