const User = require('../model/user') 


const createUserService = async (data) => {
    let result = null

    if(data.username == null || data.password == null)
        return result 

    result = await User.create(data)
    return result
}

module.exports = {
    createUserService
}