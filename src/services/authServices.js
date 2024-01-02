const User = require('../model/user') 
var crypto = require('crypto'); 

const loginService = async (data) => {
    let result = null
    console.log(data.password)
    result = await User.findOne({username : data.username})

    if(result==null)
        return "Can't find user"
    else {
        let pass = result.password
        if(pass === data.password) 
            return "Login success"
        else return "Login fail"
    }
}

const registerService = async (data) => {
    let newUser = new User(); 
    console.log(newUser)
    newUser.username = data.username, 
    newUser.email = data.email,
    newUser.password= data.password

    let checkUser = await User.findOne({username: newUser.username})
    console.log(">>>>>>>>>", checkUser)
    if(checkUser==null) {
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