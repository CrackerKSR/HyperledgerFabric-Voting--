const express = require('express')
const mongoose = require('mongoose')
const {MONGOURI} = require('./Urls/keys')
const bodyparser = require('body-parser')

const requirelogin = require('./Middleware/requirelogin')  //middleware
const bodyParser = require('body-parser')

const app = express()

app.use(express.json()) //to parse outgoing json in the post req
app.use(express.urlencoded({extended:true})) //parse html forms, like post methods etc

var ballot = require("./Routes/ballot")
var vote = require("./Routes/vote")
var signup = require("./Routes/signup")

app.set('view engine', 'html');

require('./Models/admin')
require('./Models/voter')
require('./Models/hash')
require('./Models/vote')
//models registered

app.use('/ballot',ballot)
app.use('/vote',vote)
app.use('/signup',signup)



///////MongoDB connection//////////////////////


mongoose.connect(MONGOURI,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false
})//to remove deprecated warnings

mongoose.connection.on("connected",()=>{
    console.log("Successfully made a connection with MONGO")
})

mongoose.connection.on("error",(err)=>{
    console.log("Failed to connect with MONGO",err)
    mongoose.connection.close()
})

mongoose.connection.on("exit",(err)=>{
    console.log("Failed to connect with MONGO",err)
    mongoose.connection.close()
})

///////*MongoDB connection//////////////////////

app.get('/',(req,res)=>{
    res.send('home')
})

app.listen(1970,()=>{
    console.log('connected')
})