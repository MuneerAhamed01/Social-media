const db = require("../connect")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {

    // CHECK USER EXIST

    var query = 'SELECT * FROM user WHERE userName = ?'

    db.query(query, [req.body.userName], (err, result) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
            return;
        }
        if (result.length > 0) {
            return res.send('User already exist')
        }
    })

    // HASH PASSWORD
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)


    // INSERT USER
    var query = 'INSERT INTO user (userName, password, email) VALUES (?, ?, ?)'

    db.query(query, [req.body.userName, hashPassword, req.body.email], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        res.json({ message: "User created" })
    })





}

const login = async (req, res) => {

    // CHECK USER EXIST
    var query = 'SELECT * FROM user WHERE userName = ?'

    db.query(query, [req.body.userName], (err, result) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
            return;
        }
        if (result.length === 0) {
            return res.send('User not found')
        }
        // CHECK PASSWORD
        const validPassword = bcrypt.compareSync(req.body.password, result[0].password)
        if (!validPassword) {
            return res.send('Password not correct')
        }

        const token = jwt.sign({ id: result[0].id }, 'secretKey')

        const { password, ...others } = result[0]

        res.cookie('token', token, {
            httpOnly: true
        }).status(200).json(others)
    })



}

const logout = async (req, res) => {
    res.clearCookie('token', {
        secure: true,
        sameSite: 'none'
    }).send('Logged out done')

}

module.exports = {
    login,
    register,
    logout
}