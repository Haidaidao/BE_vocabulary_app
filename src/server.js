const express = require('express')
require('dotenv').config()
const connection = require('./config/database')
const apiRoutes = require('./routes/api')

const app = express()
const port = process.env.PORT

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded( )); //Parse URL-encoded bodies

app.use('/v1/api', apiRoutes)

;(async () => {
  try{
    // Cách dùng cho mongoose
    await connection()

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
  } catch(error) {
    console.log(error)
  }
  
})()

app.listen(3000)