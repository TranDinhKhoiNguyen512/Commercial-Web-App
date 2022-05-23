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
    console.log("The server is online")
    console.log("https://github.com/TranDinhKhoiNguyen512/Commercial-Web-App/blob/main/server/README.md#test-api")

}) 