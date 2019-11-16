const express = require('express')
const db = require('../data/db-config')

const router = express.Router()

router.get('/', (req, res) => {

    db('cars')
        .then(cars => {
            res.json(cars)
        })
        .catch(err => {
            res.status(500).json({message: 'failed to retrieve cars', error: err})
        })
})

router.post('/', (req, res) => {
    const carData = req.body
    db('cars').insert(carData)
        .then(ids => {
            db('cars').where({id: ids[0]})
                .then(newCarEntry => {
                    res.status(201).json(newCarEntry)
                })
        })
        .catch(err => {
            console.log('Post error', err)
        })
})

module.exports = router