const express = require("express")
const cardRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/cards.json'

// util functions 

const savecardData = (data) => {
	const stringifyData = JSON.stringify(data)
	fs.writeFileSync(dataPath, stringifyData)
}

const getcardData = () => {
	const jsonData = fs.readFileSync(dataPath)
	return JSON.parse(jsonData)
}


// reading the data
cardRoutes.get('/card', (req, res) => {
	fs.readFile(dataPath, 'utf8', (err, data) => {
		if (err) {
			throw err;
		}

		res.send(JSON.stringify(data));
	});
});

// Create - use post method
cardRoutes.post('/card/add', (req, res) => {

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

// Read - get all cards from the json file
cardRoutes.get('/card/getAll', (req, res) => {
	var result = []
	const cards = getcardData()
	for (var i = 0; i < cards.length; i++) {
		result.push(cards[i].id)
	}
	res.send(JSON.stringify(result))
})

// Read - get cards by id
cardRoutes.get('/card/get/:id', (req, res) => {
	const cards = getcardData()
	var id = req.params['id']

	//cards.length
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].id == id) {
			var result = cards[i]
			//console.log(cards[i])

		}
	};
	res.send(JSON.stringify(result))
})
//get card attributes

cardRoutes.get('/card/get/:id/:param1/:param2/:param3/:param4', (req, res) => {

	const cards = getcardData()
	var param1 = req.params['param1']
	var param2 = req.params['param2']
	var param3 = req.params['param3']
	var param4 = req.params['param4']
	var id = req.params['id']

	//cards.length
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].id == id) {
			var result = cards[i]
			//console.log(cards[i])

		}
	};
	res.send(JSON.stringify(result[param1][param2][param3][param4]))
})

cardRoutes.get('/card/get/:id/:param1/:param2/:param3', (req, res) => {

	const cards = getcardData()
	var param1 = req.params['param1']
	var param2 = req.params['param2']
	var param3 = req.params['param3']
	var id = req.params['id']

	//cards.length
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].id == id) {
			var result = cards[i]
			//console.log(cards[i])

		}
	};
	res.send(JSON.stringify(result[param1][param2][param3]))
})
cardRoutes.get('/card/get/:id/:param1/:param2', (req, res) => {

	const cards = getcardData()
	var param1 = req.params['param1']
	var param2 = req.params['param2']
	var id = req.params['id']

	//cards.length
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].id == id) {
			var result = cards[i]
			//console.log(cards[i])

		}
	};
	res.send(JSON.stringify(result[param1][param2]))
})

cardRoutes.get('/card/get/:id/:param1', (req, res) => {

	const cards = getcardData()
	var param1 = req.params['param1']
	var id = req.params['id']

	//cards.length
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].id == id) {
			var result = cards[i]
			//console.log(cards[i])

		}
	};

	res.send(JSON.stringify(result[param1]))
})
// Update - using Put method
cardRoutes.put('/card/:id', (req, res) => {
	var existcards = getcardData()
	fs.readFile(dataPath, 'utf8', (err, data) => {
		const cardId = req.params['id'];
		existcards[cardId] = req.body;

		savecardData(existcards);
		res.send(`cards with id ${cardId} has been updated`)
	}, true);
});

//delete - using delete method
cardRoutes.delete('/card/delete/:id', (req, res) => {
	fs.readFile(dataPath, 'utf8', (err, data) => {
		var existcards = getcardData()

		const cardId = req.params['id'];

		delete existcards[userId];
		savecardData(existcards);
		res.send(`cards with id ${userId} has been deleted`)
	}, true);
})

//query - using get method

cardRoutes.get('/card/query/', (req, res) => {
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

module.exports = cardRoutes;