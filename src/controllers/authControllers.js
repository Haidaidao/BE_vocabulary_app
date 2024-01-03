const User = require('../model/user') 

const {
    loginService,
    registerService
} = require('../services/authServices')
const { 
    validateEmail
} = require('../services/valid')

const register = async (req,res) => {
    let user = req.body

    let newUser = await registerService(user)
    
    if(newUser) {
        newUser = newUser.toObject()
        delete newUser.password
        return res.status(200).send({ 
            error: 0,
            data : newUser
        }); 
    }
    else {
        if(validateEmail(user.email))
            return res.status(400).send({ 
                error: 1,
                msg : "Existed username"
            }); 
        else 
            return res.status(400).send({ 
                error: 1,
                msg : "Invalid email"
            }); 
    }

}

const login = async (req, res) => {
    let user = req.body

    let result = await loginService(user)

    if(result != null) {
        result = result.toObject()
        delete result.password
        return res.status(200).send({ 
            error: 0,
            data : result
        })
    }
    else 
        return res.status(400).send({ 
            error: 1,
            data : result
        })
}

module.exports = {
    register,
    login
}