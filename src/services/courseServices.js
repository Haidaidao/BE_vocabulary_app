const Course = require('../model/course') 

const checkElementInArr = (arr, element) => {
    for(let i = 0 ; i < arr.length; i++) {
        if(arr[i]===element) {
            return false
        }      
    }
    return true
}

const createCourseService = async (data) => {
    let result = null

    if(data.type === "EMPTY-COURSE") {
        if(data.name != null) {
            result = await Course.create(data)
            result = await result.save()
        }
    }
    else if (data.type === "ADD-WORD") {
        let myCourse = await Course.findById(data.courseId)
        let stringArray = myCourse.listVocabulary.map(objectId => objectId.toString())
        
        for(let i = 0 ; i < data.wordsArr.length; i++){
            if(stringArray.length==0)
                myCourse.listVocabulary.push(data.wordsArr[i])
            else if(checkElementInArr(stringArray, data.wordsArr[i].toString())) {
                myCourse.listVocabulary.push(data.wordsArr[i])
            }
        }
       result = await myCourse.save()
    }
    else if(data.type === "REMOVE-WORD"){
        let myCourse = await Course.findById(data.courseId)
        let stringArray = myCourse.listVocabulary.map(objectId => objectId.toString())

        for(let i = 0 ; i < data.wordsArr.length; i++){
            if(!checkElementInArr(stringArray, data.wordsArr[i].toString()))
                myCourse.listVocabulary.pull(data.wordsArr[i])
        }
        result = await myCourse.save()          
    }
    return result
}

const getCourseService = async(data) => {
    let result = null

    if(data == null)
        result = await Course.find({}).populate("listVocabulary")

    return result
}

const deleteCourseService = async(id) => {
    let result = null
    result =  await Course.deleteById(id)
    return result
}

const updateCourseService = async (data) => {
    let result = null
    if(data.name == null)
        return result 
    result = await Course.updateOne({_id: data.id}, {...data})
    return result
}

const getVocabularyInCourseService = async(data) => {
    let result = null
    result = await Course.find({_id: data}).populate("listVocabulary")
    
    return result
}

module.exports = {
    createCourseService,
    getCourseService,
    deleteCourseService,
    updateCourseService,
    getVocabularyInCourseService
}