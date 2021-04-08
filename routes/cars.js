const express = require('express')
const router = express.Router()
const CarController = require('../controllers/carController')

router.post('/', (req, res) => {
    CarController.convert(req.body).then(result => res.send(result))
})

module.exports = router