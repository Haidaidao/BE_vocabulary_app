const Course = require('../model/course') 
const {
    createCourseService,
    getCourseService,
    deleteCourseService,
    updateCourseService,
    getVocabularyInCourseService
} = require('../services/courseServices')

const createACourseAPI = async(req, res) => {
    let result = null
    result = await createCourseService(req.body)

    if(result != null)
        return res.status(200).json({
            error: 0,
            data: result
        })
    else 
        return res.status(400).json({
            error: 1,
            msg: "Error when create course"
        })

}

const getCourseAPI = async(req,res) => {
    let result = null
    result = await getCourseService()

    if(result==null)
        return res.status(400).json({
            error: 1,
            msg: "Error when create course"
        })
    else 
        return res.status(200).json({
            error: 0,
            data: result
        })
}

const deleteCourseAPI = async(req,res) => {
    let result = await deleteCourseService(req.body.id)

    if(result == null) 
        return res.status(400).json({
            error: 1,
            msg: "Error when delete course"
    })

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const updateCourseAPI = async(req,res) => {
    let result = await updateCourseService(req.body)

    if(result == null) 
        return res.status(400).json({
            error: 1,
            msg: "Error when update course"
        })

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const getVocabularyInCourseAPI = async(req,res) => {
    let result = await getVocabularyInCourseService(req.body.id)
    if(result == null) {
        
        return res.status(400).json({
            error: 1,
            msg: "Error when get vocabulary"
        })
    }
    
    const listVocabularies = result.map(item => item.listVocabulary);
    
    return res.status(200).json({
        error: 0,
        data: listVocabularies
    })
}

module.exports = {
    createACourseAPI,
    getCourseAPI,
    deleteCourseAPI,
    updateCourseAPI,
    getVocabularyInCourseAPI
}