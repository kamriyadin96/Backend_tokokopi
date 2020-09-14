const respone = require("../helpers/respon")
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")

const checkToken = (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        const result = {
            msg: "Login dulu",
        }
        return respone(res, 401, result)
    }
    const jwtToken = jwtDecode(token)
    const userRole = jwtToken.hak
    console.log(userRole)

    jwt.verify(token, process.env.JWT_KEYS, (err, decode) => {
        if (err) {
            return respone(res, 401, err)
        }
        if(userRole !== "Admin") {
            const result = {
                msg : "Anda bukan admin"
            }
            return respon (res, 401, result)
        }
        next()
    })
}

module.exports = checkToken