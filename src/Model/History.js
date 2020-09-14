const database = require("../config/Databases")
const History = {}

History.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT * FROM history ORDER BY id ASC")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

History.Add = (noInvoice, date, nameOrders, amount) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO history (invoice, date, orders, amount) VALUES ('${noInvoice}', '${date}', '${nameOrders}', ${amount});`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

History.Edit = (id, noInvoice, date, nameOrders, amount) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE history SET invoice='${noInvoice}', date='${date}', orders='${nameOrders}', amount=${amount} WHERE id=${id};`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

History.Delete = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM history WHERE id=${id};`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}
module.exports = History