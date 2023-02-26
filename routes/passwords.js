const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const PASSWORD = require('../models/passwords');

// create api

router.post('/create', [
    body('email').isEmail(),
    body('password').isLength({min: 6}),
    body('uid').notEmpty(),
    body('website').notEmpty()
],
async(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    let {email, password, uid, website} = req.body
    try {
        let data = await PASSWORD.create({
            email, password, uid, website
        })
        return res.json({
            message: 'password saved successfully!',
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'provide valid fields'
        })
    }
})

// read api

    router.get('/:id', async(req,res)=>{
        try {
            let {id} = req.params
            let data = await PASSWORD.findById(id)
            return res.json({
                data
            })
        } catch (error) {
            return res.status(400).json({
                message: 'invalid id'
            })
        }
    })

// update api
    router.put('/:id', [
        body('email').isEmail(),
        body('password').notEmpty(),
        body('uid').notEmpty(),
        body('website').notEmpty()
    ],
    async(req,res)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }
        try {
            let {uid, email, password, website} = req.body
            let {id} = req.params
            let data = await PASSWORD.findByIdAndUpdate(id, {
                uid, email, password, website
            })
            return res.json({
                message: 'record updated succesfully!',
                data
            })
        } catch (error) {
            return res.status(400).json({
                message: 'invalid id'
            })
        }

    })


// delete id

        router.delete('/:id', async(req, res)=>{
            try {
                let {id} = req.params
                let oldData = await PASSWORD.findById(id);
                if (oldData == null){
                    return res.status(400).json({
                        message: "no record found"
                    })
                }
                await PASSWORD.findByIdAndDelete(id)
                return res.json({
                    message: 'record deleted successfully!'
                })

            } catch (error) {
                return res.status(400).json({
                    message: 'invalid id'
                })
            }
        })

module.exports = router