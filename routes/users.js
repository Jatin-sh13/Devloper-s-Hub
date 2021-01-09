const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt=require('jsonwebtoken')
const config=require('config')
const User = require('../models/user')
const { body, validationResult } = require('express-validator');

router.post('/', [
    body('name', 'Please Enter Your Name').not().isEmpty(),
    body('email', 'Please Enter a valid Email').isEmail(),
    body('password', 'Please enter more than 6 char').isLength({ min: 6 })
], async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body

    try {
        //Checking user is already in the db or not
        let user = await User.findOne({ email })
        if (user) {
            res.status(400).json("User Already Exist")
        }
        //Setting Gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: 'pg',
            d: 'mm'
        })
        user = new User({
            name,
            email,
            password,
            avatar
        })
        //Password Encryption
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        const payload = {
            user: {
                id: user.id     ///payload bna kar TOKEN MAI USER KI ID BHJ RHE HAI 
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
                res.json({ token }); //yha se ham token bhej rhe hai res mai phir ham usko frontend se access krke loacl storage mai save kr denge
            },
        );
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
