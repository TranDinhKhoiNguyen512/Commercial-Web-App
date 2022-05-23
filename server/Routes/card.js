const express = require("express")
const cardRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/cards.json' 

// util functions 

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
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


  cardRoutes.post('/card/add', (req, res) => {
   
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
   
    existAccounts[newAccountId] = req.body
     
    console.log(existAccounts);

    saveAccountData(existAccounts);
    res.send({success: true, msg: 'account data added successfully'})
})

// Read - get all cards from the json file
cardRoutes.get('/card/getAll', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})

// Update - using Put method
cardRoutes.put('/card/:id', (req, res) => {
   var existAccounts = getAccountData()
   fs.readFile(dataPath, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;

    saveAccountData(existAccounts);
    res.send(`accounts with id ${accountId} has been updated`)
  }, true);
});

//delete - using delete method
cardRoutes.delete('/card/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = getAccountData()

    const cardId = req.params['id'];

    delete existAccounts[userId];  
    saveAccountData(existAccounts);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
})
module.exports = cardRoutes;