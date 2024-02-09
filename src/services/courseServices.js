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

const getCourseService = async(id) => {
    let result = null
   
    result = await Course.find({userInfor: id}).populate("listVocabulary")

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

const getQuestionForTest = (temp, numberTest, wordList, words, result) => {
    temp = wordList.slice(0,numberTest)

    let answerList
    for(let i =0; i < numberTest; i ++) {
        answerList =  words[0]['listVocabulary'].filter(function(element) {
            return element['_id'] != temp[i]['_id'] 
        })
        answerList.sort(() => Math.random() - 0.5)
        let answerListTemp = [temp[i]['mean']]
        for(let i = 0 ; i < numberTest ; i++)
            answerListTemp.push(answerList[i]['mean'])
        let question = {
            question: temp[i]['name'],
            answers: answerListTemp,
            correct: temp[i]['mean']
        }
        result.push(question)
    }
}

const getVocabularyTestService = async(data) => {
    let numberTest = 3
    let result = []
    let words = null
    words = await Course.find({_id: data}).populate("listVocabulary")
    let wordList = words[0]['listVocabulary'].filter(function(element) {
        return element['complete'] == false;
    });
    wordList.sort(() => Math.random() - 0.5) // Random position in list 
 
    let temp
    if(wordList.length>=numberTest) {
        getQuestionForTest(temp, numberTest, wordList, words, result)
    }
    else {
        temp = wordList
        let answerList
        for(let i =0; i < wordList.length; i ++) {
            answerList =  words[0]['listVocabulary'].filter(function(element) {
                return element['_id'] != temp[i]['_id'] 
            })
            answerList.sort(() => Math.random() - 0.5)
            let answerListTemp = [temp[i]['mean']]
            for(let i = 0 ; i < answerList.length ; i++)
                answerListTemp.push(answerList[i]['mean'])
            for(let i = 0 ; i < numberTest - answerList.length ; i++)
                answerListTemp.push(' ')
            let question = {
                question: temp[i]['name'],
                answers: answerListTemp,
                correct: temp[i]['mean']
            }
            result.push(question)
        }
    }
    return result
}

module.exports = {
    createCourseService,
    getCourseService,
    deleteCourseService,
    updateCourseService,
    getVocabularyInCourseService,
    getVocabularyTestService
}