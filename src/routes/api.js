const express = require('express')
const {
    postCreateUserAPI
} = require('../controllers/userControllers') 

const {
    register,
    login
} = require('../controllers/authControllers')

const {
    postCreateVocabularyAPI,
    deleteVocabularyAPI,
    updateVocabularyAPI
} = require('../controllers/vocabularyControllers')

const {
    createACourseAPI,
    getCourseAPI,
    deleteCourseAPI,
    updateCourseAPI,
    getVocabularyInCourseAPI
} = require('../controllers/courseControllers')

const routerAPI = express.Router()

// User
routerAPI.post('/users', postCreateUserAPI)

// auth
routerAPI.post('/auth/register', register)
routerAPI.post('/auth/login', login)

// vocabulary
routerAPI.post('/vocabulary', postCreateVocabularyAPI)
routerAPI.delete('/vocabulary', deleteVocabularyAPI)
routerAPI.put('/vocabulary', updateVocabularyAPI)


// course
routerAPI.post('/course', createACourseAPI)
routerAPI.get('/course', getCourseAPI)
routerAPI.delete('/course', deleteCourseAPI)
routerAPI.put('/course', updateCourseAPI)
routerAPI.post('/get_vocabulary_course', getVocabularyInCourseAPI)

module.exports = routerAPI