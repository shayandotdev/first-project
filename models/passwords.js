const express = require('express');
const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
},{
    collection: 'passwords'
});


const model = mongoose.model('passwordSchema', passwordSchema);4

module.exports = model