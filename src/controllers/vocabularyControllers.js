const Vocabulary = require('../model/vocabulary') 
const {
    createVocabularyService,
    deleteVocabularyService,
    updateVocabularyService
} = require('../services/vocabularyServices')


const postCreateVocabularyAPI = async(req, res) => {
    const data = req.body

    let result = await createVocabularyService(data)

    if(result == null) 
        return res.status(400).json({
            error: 1,
            msg: "Error when add word"
    })

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const deleteVocabularyAPI = async(req, res) => {

    let result = await deleteVocabularyService(req.body.id)

    if(result == null) 
        return res.status(400).json({
            error: 1,
            msg: "Error when delete word"
    })

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const updateVocabularyAPI = async(req, res) => {

    let result = await updateVocabularyService(req.body)

    if(result == null) 
        return res.status(400).json({
            error: 1,
            msg: "Error when update word"
    })

    return res.status(200).json({
        error: 0,
        data: result
    })
}

module.exports = {
    postCreateVocabularyAPI,
    deleteVocabularyAPI,
    updateVocabularyAPI
}