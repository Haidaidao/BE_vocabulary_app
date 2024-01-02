const User = require('../model/user') 

const {
    loginService,
    registerService
} = require('../services/authServices')


const register = async (req,res) => {
    let user = req.body

    let newUser = await registerService(user)
    console.log(newUser)
    if(newUser)
        return res.status(200).send({ 
            error: 0,
            data : newUser
        }); 
    else 
        return res.status(400).send({ 
            error: 1,
            msg : "Existed username"
        }); 
    // return res.send("hello")
}

const login = async (req, res) => {
    let user = req.body

    const result = await loginService(user)

    if(result == "Login success")
        return res.status(200).send({ 
            error: 0,
            data : result
        })
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