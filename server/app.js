const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
const cors = require('cors')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


// create our express app
const app = express()
// middleware
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "PokeShop API",
      version: '9.9.1',
    },
  },
  apis: ["./Routes/cards.js"],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors({origin:"*"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require('./Routes/Route')
app.use('/', routes)

//start server
app.listen(5000, ()=>{
    console.log("The server is online")
    console.log("https://github.com/TranDinhKhoiNguyen512/Commercial-Web-App/blob/main/server/README.md#test-api")

}) 
