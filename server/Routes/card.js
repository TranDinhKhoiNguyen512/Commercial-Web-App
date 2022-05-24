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

		res.send(JSON.parse(data));
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
	res.send(JSON.parse(result))
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
	res.send(JSON.parse(result))
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

	res.send(JSON.stringify((result[param1])))
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
module.exports = cardRoutes;