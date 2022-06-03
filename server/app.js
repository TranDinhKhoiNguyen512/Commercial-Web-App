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
  const stringifyData = JSON.stringify(data, null, 4)
  fs.writeFileSync(dataPath, stringifyData)
}

const getcardData = () => {
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)
}

// lmao
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// card object definition 
/**
 * @swagger
 * definitions:
 *  Card:
 *   type: object
 *   properties:
 *    artist:
 *     type: string
 *     description: Artist of the card
 *     example: 'Ken Sugimori'
 *    supertype:
 *     type: string
 *     description: supertype of the card
 *     example: 'Pokemon'
 *    subtypes:
 *     type: array
 *     item:
 *      type: string
 *     description: subtypes of the card
 *     example: ['Stage 2']
 *    types:
 *     type: array
 *     item:
 *      type: string
 *     description: types of the card
 *     example: ['psychic']
 *    hp:
 *     type: string
 *     description: number of the card
 *     example: '80'
 *    number:
 *     type: string
 *     description: number of the card
 *     example: '1'
 *    rarity:
 *     type: string
 *     description: rarity of the card
 *     example: 'Rare Holo'
 *    name:
 *     type: string
 *     description: name of the card
 *     example: 'Alakazam'
 *    id:
 *     type: string
 *     description: id of the card
 *     example: 'base1-1'
 *    flavorText:
 *     type: string
 *     description: flavortext of the card
 *     example: 'Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5000.'
 *    rules:
 *     type: string
 *     description: rules for the card (usually on Trainer supertype cards)
 *     example: 'string'
 *    set:
 *     type: object
 *     properties:
 *      id:
 *       type: string
 *       description: id of the set
 *       example: 'base1'
 *      name:
 *       type: string
 *       description: name of the set
 *       example: 'Base'
 *      series:
 *       type: string
 *       description: series of the set
 *       example: 'Base'
 *      releaseDate:
 *       type: string
 *       description: release date of the set
 *       example: '1999/01/09'
 *    images:
 *     type: object
 *     properties:
 *      small:
 *       type: string
 *       description: image of the card but smaller
 *       example: 'https://images.pokemontcg.io/base1/1.png'
 *      large:
 *       type: string
 *       description: image of the card 
 *       example: 'https://images.pokemontcg.io/base1/1_hires.png'
 *    cardmarket:
 *     type: object
 *     properties:
 *      prices:
 *       type: object
 *       properties:
 *        averageSellPrice:
 *         type: number
 *         description: price of the card
 *         example: 21.65
 *      
 *       
 * 
 */

// START CARD API
/**
 * @swagger
 * /card/add:
 *  post:
 *   summary: create card
 *   description: create new card and save it in database
 *   tags:
 *    - Cards
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the card
 *      schema:
 *       $ref: '#/definitions/Card'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Card'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */
// Create - use post method
app.post('/card/add', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    var existcards = getcardData()
    var found = false
    const newcard = req.body;
    for (const card of existcards) {
      if(card.id == newcard.id){
        var index = existcards.indexOf(card)
        found = true
        res.send(`cards with id ${newcard.id} is already in the card database`)
      }

    }
    if(found == false){
      
      existcards.push(newcard)
      savecardData(existcards)
      res.send(`cards with id ${newcard.id} has been added to the card database`)
    }
    
  }, true);
})


/**
 * @swagger
 * /card/{id}:
 *  put:
 *   summary: update a card
 *   description: update information of the card
 *   tags:
 *    - Cards
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: id of the card needed to be update
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the card
 *      schema:
 *       $ref: '#/definitions/Card'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Card'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */
// Update - using Put method
app.put('/card/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    var existcards = getcardData()
    var found = false
    const cardId = req.params.id;
    const newcard = req.body;
    for (const card of existcards) {
      if(card.id == cardId){  
        var index = existcards.indexOf(card)
        found = true
        existcards[index] = newcard
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
 *     summary: get all card ID
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
  res.send(JSON.stringify(result, null, 4))
})



 /**
   * @swagger
   * /card/get/{id}:
   *   get:
   *     summary: get card by ID
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
  res.send(JSON.stringify(result, null, 4))
})





 /**
   * @swagger
   * /card/query:
   *   get:
   *     summary: get an array of cards that fit the condition
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
   *        name: rarity
   *        type: string
   *        description: Card's rarity 
   *      - in: query
   *        name: subtype
   *        type: string
   *        description: Card's subtype
   *      - in: query
   *        name: type
   *        type: string
   *        description: Pokemon's type
   *      - in: query
   *        name: page
   *        type: string
   *        description: pagenumber for result (most of the time there will be more than 1 page of result will be returned)
   *      - in: query
   *        name: perpage
   *        type: string
   *        description: the number of item per page
   *     responses:
   *       200:
   *         description: OK
   */
//query - using get method
app.get('/card/query/', (req, res) => {
  var searchstringlist = req.query.searchstring
  var setlist = req.query.set
  var serieslist = req.query.series
  var raritylist = req.query.rarity
  var supertypelist = req.query.supertype
  var subtypelist = req.query.subtype
  var typelist = req.query.type
  var result = []
  var page_number = req.query.page
  var per_page = req.query.perpage

  if (page_number == "" ||page_number === undefined){
    page_number = 1
  }
  if (per_page == "" ||per_page === undefined){
    per_page = 12
  }

  const cards = getcardData()
  for (var i = 0; i < cards.length; i++) {
    //Name || ID check
    
    var nameCheck = false
    if (searchstringlist == "" || searchstringlist == undefined){
      var nameCheck = true
    }
    else{
      var searchstring = searchstringlist.split(",")
      for(item in searchstring){
        //console.log(allstring[str])
        if (cards[i].name.toLowerCase().includes(searchstring[item].toLowerCase()) || cards[i].id == searchstring[item] ) {
          var nameCheck = true
        }
      }
        
    }
    

    //Set Check
    var setCheck = false
    if (setlist == "" ||setlist === undefined){
      var setCheck = true
    }
    else{
      var set = setlist.split(",")
      for(item in set){
        if (cards[i].set.id.toLowerCase() == set[item].toLowerCase()){
          var setCheck = true
        }
      }
    }

    //Series Check
    var seriesCheck = false
    if (serieslist == ""||serieslist === undefined){
      var seriesCheck = true
    }
    else{
      var series = serieslist.split(",")
      for (item in series){
        if (cards[i].set.series.toLowerCase() == series[item].toLowerCase()){
          var seriesCheck = true
        }
      }
      
    }

    //rarity check 
    var rarityCheck = false
    if (raritylist == ""||raritylist === undefined){
      var rarityCheck = true
    }
    else{
      var rarity = raritylist.split(",")
      if (cards[i].rarity != null){
          for(item in rarity){
          if (cards[i].rarity.toLowerCase() == rarity[item].toLowerCase()){
            var rarityCheck = true
          }
        }
      }
      
    }

    //supertype check
    var supertypeCheck = false
    if (supertypelist == ""||supertypelist === undefined){
      var supertypeCheck = true
    }
    else{
      var supertype = supertypelist.split(",")
      for(item in supertype){
        if (supertype[item].toLowerCase().includes(cards[i].supertype.toLowerCase())){
          var supertypeCheck = true
        }
      }
    }

    //subtype check
    var subtypeCheck = false
    if (subtypelist == "" ||subtypelist === undefined){
      var subtypeCheck = true
    }
    else{
      if (cards[i].subtypes != null){
        subtypes = subtypelist.split(",")
        for(item in subtypes){
          if (subtypes[item].toLowerCase().includes(cards[i].subtypes[0].toLowerCase())){
            var subtypeCheck = true
          }
        }
      }
      else{
        //console.log(cards[i].id)
      }
      
    }

    //type check
    var typeCheck = false
    if (typelist == "" ||typelist === undefined){
      var typeCheck = true
    }
    else{
      if (cards[i].types != null){
        var type = typelist.split(",")
        for(item in type){
          if (type[item].toLowerCase().includes(cards[i].types[0].toLowerCase())){
            var typeCheck = true
          }
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
   *     summary: delete card by id
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

/**
 * @swagger
 * /rarity/getAll:
 *   get:
 *     summary: get all card's rarities
 *     description: Get all card's rarities
 *     tags:
 *      - Card's Attribute
 *     responses:
 *       200:
 *         description: Success
 * 
 */
// Read - get all rarities of all the cards from the json file
app.get('/rarity/getAll', (req, res) => {
  var result = []
  const cards = getcardData()
  for (var i = 0; i < cards.length; i++) {
    //result.push(cards[i].id)
    if(result.indexOf(cards[i].rarity) === -1){
      result.push(cards[i].rarity)
    }
  }
  res.send(JSON.stringify(result, null, 4))
})
// END CARD API

//start server
app.listen(5000, ()=>{
    console.log("The server is online")
    console.log("server-side-github-link: https://github.com/TranDinhKhoiNguyen512/Commercial-Web-App/blob/main/server/README.md#test-api")
    console.log("")
    console.log("server-side-api-UI: http://localhost:5000/ui/")

}) 
