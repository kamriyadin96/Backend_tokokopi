const model = require("../model/users")
const respone = require("../helpers/respon")
const hashPassword = require("../helpers/hash")

class Users {
    
    async getAll(req, res) {
        try {
            const result = await model.getAll()
            return respone(res, 200, result)
        } catch (error) {
            return respone(res, 500, error)
        }
    }

    async getByUser(req, res) {
        try {
            const result = await model.getByUser(req.query.username)
            return respone(res, 200, result)
        } catch (error) {
            return respone(res, 500, error)
        }
    }

    async getById(req, res) {
        try {
            const result = await model.getById(req.params.id)
            return respone(res, 200, result)
        } catch (error) {
            return respone(res, 500, error)
        }
    }

    async addUsers(req, res) {
        try {

            const passHash = await hashPassword(req.body.password)

            const data = {
                username: req.body.username,
                password: passHash,
                hak : req.body.hak,
            }
            
            const result = await model.addUsers(data)
            return respone(res, 200, data)
        } catch (error) {
            return respone(res, 500, error)
        }
    }

    async delUsers(req, res) {
        try {
            const result = await model.delUsers(req.params.id)
            return respone(res, 200, result)
        } catch (error) {
            return respone(res, 500, error)
        }
    }
}

module.exports = new Users()