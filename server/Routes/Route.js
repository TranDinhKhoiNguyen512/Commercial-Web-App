const express = require("express")
const router = express.Router();
const fs = require('fs');
const cardRoutes = require('./card.js')

router.use(cardRoutes)
module.exports = router;