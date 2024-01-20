const Vocabulary = require('../model/vocabulary') 

const createVocabularyService = async (data) => {
    let result = null

    if(data.mean == null || data.name == null)
        return result 

    data.important = false
    result = await Vocabulary.create(data)
    return result
}

const deleteVocabularyService = async (id) => {
    let result = null
    result =  await Vocabulary.deleteById(id)
    return result
}

const updateVocabularyService = async (data) => {
    let result = null
    if(data.mean == null || data.name == null)
        return result 
    result = await Vocabulary.updateOne({_id: data.id}, {...data})
    return result
}

module.exports = {
    createVocabularyService,
    deleteVocabularyService,
    updateVocabularyService
}