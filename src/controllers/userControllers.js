const User = require('../model/user') 
const {
    createUserService
} = require('../services/userServices')

const postCreateUserAPI = async(req, res) => {
    const data = req.body

    let result = await createUserService(data)

    if(result == null) 
        return res.status(400).json({
            error: 1,
            msg: "Error when create user"
    })

    return res.status(200).json({
        error: 0,
        data: result
    })
}

module.exports = {
    postCreateUserAPI
}