const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require('./Routes/Route')
app.use('/', routes)

//start server
app.listen(3000, ()=>{
    console.log("listening at port:3000")
    console.log("'C': http://localhost:3000/account/addaccount")
    console.log("'R': http://localhost:3000/card/getByID/base1-1")
    console.log("'R': http://localhost:3000/card/get/set/id")
    console.log("'U': http://localhost:3000/account/{id}")
    console.log("'D': http://localhost:3000/account/delete/{id}")
}) 