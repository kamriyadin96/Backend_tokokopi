const model = require("../model/users")
const respone = require("../helpers/respon")
const bcr = require("bcrypt")
const jwt = require("jsonwebtoken")

class Auth {

    login = async (req, res) => {
        try {
            const passDB = await model.getByUser(req.body.username)

            if (passDB.length <= 0) {
                return respone(res, 200, "Username tidak terdaftar")
            }

            const passReq = req.body.password
            const check = await bcr.compare(passReq, passDB[0].password)

            if (check) {
                const result = await this.setToken(req.body.username)
                return respone(res, 200, result)
                
                
            } else {
                return respone(res, 200, "gagal login")
            }

        } catch (error) {
            console.log(error)
            respone(res, 500, error)
        }
    }

    setToken = async (hak) => {
        try {
            const payload = {
                hak : hak,
                    
            }
            

            const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: 60 })

            const result = {
                token: token,
                msg: "Token created, login succsess",
            }

            return result
        } catch (error) {
            throw error
        }
    }
}


module.exports = new Auth()