const express = require('express')
const bodyParser = require('body-parser')


const app = express()

/*** Config ***/
app.set('view engine', 'ejs')

/*** Middlewares ***/
app.use( bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

/*** routers ****/
let rows = 0
app.use('/', require('./routes/tasks'))



const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(' ==> Server Listen on port: ' + PORT))
