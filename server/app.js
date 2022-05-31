const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
const cors = require('cors')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const dataPath = './Details/cards.json'

// create our express app
const app = express()
// middleware
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "PokeShop API",
      version: '0.1',
    },
  },
  apis: ["app.js"],
};


app.use(cors({origin:"*"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const savecardData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPath, stringifyData)
}

const getcardData = () => {
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)
}

// lmao
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// START CARD API

// Create - use post method
app.post('/card/add', (req, res) => {

  var existcards = getcardData()
  const newcardId = Math.floor(100000 + Math.random() * 900000)

  existcards[newcardId] = req.body

  console.log(existcards);

  savecardData(existcards);
  res.send({
    success: true,
    msg: 'card data added successfully'
  })
})



// Update - using Put method
app.put('/card/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    var existcards = getcardData()
    var found = false
    const cardId = req.params.id;
    for (const card of existcards) {
      if(card.id == cardId){
        var index = existcards.indexOf(card)
        found = true
        console.log(cardId)
        console.log(index)
        existcards.splice(index, 1);
        savecardData(existcards);    
        res.send(`cards with id ${cardId} has been updated`)
      }

    }
    if(found == false){
      res.send(`cards with id ${cardId} cant be found`)
    }
    
  }, true);
});




/**
 * @swagger
 * /card/getAll:
 *   get:
 *     description: Get all card ID
 *     tags:
 *      - Cards
 *     responses:
 *       200:
 *         description: Success
 * 
 */

// Read - get all cards from the json file
app.get('/card/getAll', (req, res) => {
  var result = []
  const cards = getcardData()
  for (var i = 0; i < cards.length; i++) {
    result.push(cards[i].id)
  }
  res.send(JSON.stringify(result))
})



 /**
   * @swagger
   * /card/get/{id}:
   *   get:
   *     description: Returns card with search param
   *     tags:
   *      - Cards
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        type: string
   *        description: Card's ID
   *     responses:
   *       200:
   *         description: OK
   */

// Read - get cards by id
app.get('/card/get/:id', (req, res) => {
  const cards = getcardData()
  var id = req.params.id

  //cards.length
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].id == id) {
      var result = cards[i]
      //console.log(cards[i])

    }
  };
  res.send(JSON.stringify(result))
})




 /**
   * @swagger
   * /card/query:
   *   get:
   *     description: Returns card with search param
   *     tags:
   *      - Cards
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: query
   *        name: searchstring
   *        type: string
   *        description: Card's Name or Card's ID
   *      - in: query
   *        name: series
   *        type: string
   *        description: Card's Series
   *      - in: query
   *        name: set
   *        type: string
   *        description: Card's Set
   *      - in: query
   *        name: rarity
   *        type: string
   *        description: Card's rarity 
   *      - in: query
   *        name: supertype
   *        type: string
   *        description: Card's supertype (Pokemon/Trainer/Energy)
   *      - in: query
   *        name: subtype
   *        type: string
   *        description: Card's subtype
   *      - in: query
   *        name: type
   *        type: string
   *        description: Pokemon's type
   *     responses:
   *       200:
   *         description: OK
   */
//query - using get method
app.get('/card/query/', (req, res) => {
  var searchstring = req.query.searchstring
  var set = req.query.set
  var series = req.query.series
  var rarity = req.query.rarity
  var supertype = req.query.supertype
  var subtype = req.query.subtype
  var type = req.query.type
  var result = []
  var page_number = req.query.page
  var per_page = 20

  if (page_number == "" ||page_number === undefined){
    page_number = 1
  }

  const cards = getcardData()
  for (var i = 0; i < cards.length; i++) {
    //Name || ID check
    if (searchstring == "" || searchstring == undefined){
      var nameCheck = true
    }
    else{
      if (cards[i].name.toLowerCase().includes(searchstring.toLowerCase()) || cards[i].id == searchstring ) {
        var nameCheck = true
      }
      else{
        var nameCheck = false
      }
    }
    

    //Set Check
    if (set == "" ||set === undefined){
      var setCheck = true
    }
    else{
      if (cards[i].set.id == set){
        var setCheck = true
      }
      else{
        var setCheck = false
      }
    }

    //Series Check
    if (series == ""||series === undefined){
      var seriesCheck = true
    }
    else{
      if (cards[i].set.series == series){
        var seriesCheck = true
      }
      else{
        var seriesCheck = false
      }
    }

    //rarity check 
    if (rarity == ""||rarity === undefined){
      var rarityCheck = true
    }
    else{
      if (cards[i].rarity == rarity){
        var rarityCheck = true
      }
      else{
        var rarityCheck = false
      }
    }

    //supertype check
    if (supertype == ""||supertype === undefined){
      var supertypeCheck = true
    }
    else{
      if (cards[i].supertype == supertype){
        var supertypeCheck = true
      }
      else{
        var supertypeCheck = false
      }
    }

    //subtype check
    if (subtype == "" ||subtype === undefined){
      var subtypeCheck = true
    }
    else{
      if (cards[i].subtypes != null){
        if (cards[i].subtypes[0] == subtype){
        var subtypeCheck = true
        }
        else{
          var subtypeCheck = false
        }
      }
      else{
        //console.log(cards[i].id)
      }
      
    }

    //type check
    if (type == "" ||type === undefined){
      var typeCheck = true
    }
    else{
      if (cards[i].types != null){
        if (cards[i].types[0] == type){
        var typeCheck = true
        }
        else{
          var typeCheck = false
        }
      }
      else{
        //console.log(cards[i].id)
      }
      
    }

    // if card info check ok
    if ( nameCheck && setCheck && seriesCheck && rarityCheck && supertypeCheck && subtypeCheck && typeCheck){
        //For debugging
        //result.push((cards[i].name+"|"+cards[i].id))
        result.push((cards[i]))
    }
    else{
      // ??? Do nothing i guess
    }

  }
  var totalItem = result.length
  var totalPage = Math.ceil(totalItem/per_page)
  //res.send(JSON.stringify(result))
  
  var startIndex = (page_number - 1)*per_page
  if( page_number == totalPage){
    var endIndex = totalItem
  }
  else{
    var endIndex = page_number*per_page
  }

  data = result.slice(startIndex,endIndex)
  var response = {"total":totalPage,"page":parseInt(page_number),"data":data}
    
  ;
  res.send(response)
  //console.log(page_number,totalPage,startIndex,endIndex)

  //res.send(req.query)
})
 /**
   * @swagger
   * /card/delete/{id}:
   *   delete:
   *     description: Returns card with search param
   *     tags:
   *      - Cards
   *     produces:
   *      - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        type: string
   *        description: Card's ID
   *     responses:
   *       200:
   *         description: OK
   */

//delete - using delete method
app.delete('/card/delete/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    var existcards = getcardData()
    var found = false
    const cardId = req.params.id;
    for (const card of existcards) {
      if(card.id == cardId){
        var index = existcards.indexOf(card)
        found = true
        console.log(cardId)
        console.log(index)
        existcards.splice(index, 1);
        savecardData(existcards);    
        res.send(`cards with id ${cardId} has been deleted`)
      }

    }
    if(found == false){
      res.send(`cards with id ${cardId} cant be found`)
    }
    
  }, true);
})
// END CARD API

//start server
app.listen(5000, ()=>{
    console.log("The server is online")
    console.log("server-side-github-link: https://github.com/TranDinhKhoiNguyen512/Commercial-Web-App/blob/main/server/README.md#test-api")
    console.log("")
    console.log("server-side-api-UI: http://localhost:5000/api-docs/")

}) 
