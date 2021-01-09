const express = require('express')
const authmiddle = require('../middleware/authmiddle')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const config = require('config')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = express.Router()
router.get('/', authmiddle, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        res.status(401).send("Server Error")
    }
})
router.post('/', [
    body('email', 'Please Include valide Email').isEmail(),
    body('password', 'Please Include valide Email').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //user ko login kr rhe hai 
    //db mai email find krenge milgya toh thik hai agr nhi mila toh invalid credentials  
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'invalid credentials' })
        }
        //agr milgya user toh phir usko valid krvana hai 
        const isMatch = await bcrypt.compare(password, user.password) //plain text (password) or db mai jo user.password hai usko match krega 
        if (!isMatch) {
            res.status(400).json({ msg: "Invalid password" })
        }
        //agr login hojata hai toh token set krenge
        const payload = {
            user: {
                id: user.id     ///TOKEN MAI USER KI ID BHJ RHE HAI 
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            },
        );
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
