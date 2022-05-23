const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require('./account.js')
const cardRoutes = require('./card.js')

router.use(accountRoutes)
router.use(cardRoutes)
module.exports = router;