const User = require('../model/user') 
var crypto = require('crypto'); 
const { 
    validateEmail
} = require('../services/valid')


const loginService = async (data) => {
    
    let result = null
    result = await User.findOne({username : data.username})
    
    if(result==null)
        return null
    else 
        if(await result.validatePassword(data.password)) 
            return result

}

const registerService = async (data) => {
    let newUser = new User(); 
 
    newUser.username = data.username, 
    newUser.email = data.email,
    newUser.password= data.password
    newUser.idCourse = data.idCourse
    newUser.nameCourse = data.nameCourse

    let checkUser = await User.findOne({username: newUser.username})
    
    if(checkUser==null && validateEmail(newUser.email)) {
        await newUser.setPassword(data.password)
        newUser.save()
        return newUser
    }
    else {
        return null
    }
}

module.exports = {
    loginService,
    registerService
}