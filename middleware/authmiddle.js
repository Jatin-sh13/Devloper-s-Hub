const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = function (req, res, next) {
    //getting token from header
    const token = req.header('x-auth-header')
    //checking if not token
    if (!token) {
        return res.status(401).json({ msg: 'Access Denied' })
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')) //ye jo user id return krega usko req.user mai store krlenge
        req.user = decoded.user
        next()//ab hamare pass user ki id aa chuki hai
    } catch (error) {
        console.log(error)
    }
}