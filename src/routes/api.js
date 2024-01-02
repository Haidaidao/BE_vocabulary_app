const express = require('express')
const {
    postCreateUserAPI
} = require('../controllers/userControllers') 

const {
    register,
    login
} = require('../controllers/authControllers')

const routerAPI = express.Router()

// User
routerAPI.post('/users', postCreateUserAPI)

// auth
routerAPI.post('/auth/register', register)
routerAPI.post('/auth/login', login)

module.exports = routerAPI