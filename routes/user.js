const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const USER = require('../models/user')


router.post('/register', [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').isEmail(),
    body('username').notEmpty(),
    body('password').isLength({ min: 6 }),
    body('phoneNumber').notEmpty(),
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            let { firstName, lastName, email, username, password, phoneNumber } = req.body;

            const oldData = await USER.findOne({ email });
            const phoneData = await USER.findOne({ phoneNumber });
            const usernameData = await USER.findOne({ username });

            if (oldData) {
                return res.status(403).json({
                    message: "email already exists!",
                })
            };

            if (phoneData) {
                return res.status(403).json({
                    message: "phone already exists!",
                })
            };

            if (usernameData) {
                return res.status(403).json({
                    message: " already exists!",
                })
            };

            const user = await USER.create({
                firstName,
                lastName,
                email,
                username,
                password,
                phoneNumber
            });
            res.json({
                message: "user successfully created!",
                data: user
            });


        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ message: 'provide all fields' })
        }
    });


router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
],
   async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            let { email, password } = req.body;
            const userEmail = await USER.findOne({ email })
            if (userEmail === null) {
                return res.status(404).json({
                    message: 'user does not exists!'
                })
            };
            console.log(userEmail.password);
            console.log(password);

            if (userEmail.password !== password) {
                return res.status(403).json({
                    message: 'wrong password'
                })
            }

            return res.json({
                message: "login successful",
                data: userEmail
            })

        } catch (error) {
            return res.status(400).json({
                message: 'invalid credentials'
            })
        }

    })


module.exports = router